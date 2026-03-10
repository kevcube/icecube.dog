'use client';

import { useEffect, useRef, useState } from 'react';

interface WebGPUHeroProps {
  className?: string;
  colors?: [number, number, number][];
}

export function WebGPUHero({
  className = '',
  colors = [
    [0.2, 0.4, 0.9],  // Blue
    [0.5, 0.2, 0.8],  // Purple
    [0.9, 0.3, 0.5],  // Pink
  ]
}: WebGPUHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supportsWebGPU, setSupportsWebGPU] = useState(true);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let device: GPUDevice;
    let context: GPUCanvasContext;

    async function initWebGPU() {
      if (!('gpu' in navigator)) {
        setSupportsWebGPU(false);
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        setSupportsWebGPU(false);
        return;
      }

      device = await adapter.requestDevice();
      context = canvas.getContext('webgpu') as GPUCanvasContext;

      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      });

      // Shader code
      const shaderCode = `
        struct VertexOutput {
          @builtin(position) position: vec4<f32>,
          @location(0) uv: vec2<f32>,
        }

        @vertex
        fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
          var positions = array<vec2<f32>, 6>(
            vec2<f32>(-1.0, -1.0),
            vec2<f32>(1.0, -1.0),
            vec2<f32>(-1.0, 1.0),
            vec2<f32>(-1.0, 1.0),
            vec2<f32>(1.0, -1.0),
            vec2<f32>(1.0, 1.0)
          );

          var uvs = array<vec2<f32>, 6>(
            vec2<f32>(0.0, 1.0),
            vec2<f32>(1.0, 1.0),
            vec2<f32>(0.0, 0.0),
            vec2<f32>(0.0, 0.0),
            vec2<f32>(1.0, 1.0),
            vec2<f32>(1.0, 0.0)
          );

          var output: VertexOutput;
          output.position = vec4<f32>(positions[vertexIndex], 0.0, 1.0);
          output.uv = uvs[vertexIndex];
          return output;
        }

        @group(0) @binding(0) var<uniform> time: f32;

        @fragment
        fn fragmentMain(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
          let color1 = vec3<f32>(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]});
          let color2 = vec3<f32>(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]});
          let color3 = vec3<f32>(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]});

          // Create flowing waves
          let wave1 = sin(uv.x * 3.0 + time * 0.5) * 0.5 + 0.5;
          let wave2 = sin(uv.y * 4.0 - time * 0.3) * 0.5 + 0.5;
          let wave3 = sin((uv.x + uv.y) * 2.0 + time * 0.4) * 0.5 + 0.5;

          // Mix colors based on waves
          var color = mix(color1, color2, wave1);
          color = mix(color, color3, wave2 * wave3);

          // Add some subtle gradient
          let gradient = 1.0 - uv.y * 0.3;
          color *= gradient;

          return vec4<f32>(color, 1.0);
        }
      `;

      const shaderModule = device.createShaderModule({
        code: shaderCode,
      });

      // Create uniform buffer for time
      const uniformBuffer = device.createBuffer({
        size: 4, // float32
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const bindGroupLayout = device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.FRAGMENT,
            buffer: { type: 'uniform' as const },
          },
        ],
      });

      const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
          {
            binding: 0,
            resource: { buffer: uniformBuffer },
          },
        ],
      });

      const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      });

      const pipeline = device.createRenderPipeline({
        layout: pipelineLayout,
        vertex: {
          module: shaderModule,
          entryPoint: 'vertexMain',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fragmentMain',
          targets: [
            {
              format: presentationFormat,
            },
          ],
        },
        primitive: {
          topology: 'triangle-list',
        },
      });

      // Animation loop
      const startTime = Date.now();

      function render() {
        const time = (Date.now() - startTime) / 1000.0;

        // Update time uniform
        device.queue.writeBuffer(
          uniformBuffer,
          0,
          new Float32Array([time])
        );

        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();

        const renderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0, g: 0, b: 0, a: 1 },
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        };

        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.draw(6);
        passEncoder.end();

        device.queue.submit([commandEncoder.finish()]);

        animationFrameRef.current = requestAnimationFrame(render);
      }

      render();
    }

    initWebGPU();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleResize() {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!supportsWebGPU) {
    // Fallback gradient for browsers without WebGPU
    return (
      <div
        className={className}
        style={{
          background: `linear-gradient(135deg,
            rgb(${colors[0][0] * 255}, ${colors[0][1] * 255}, ${colors[0][2] * 255}),
            rgb(${colors[1][0] * 255}, ${colors[1][1] * 255}, ${colors[1][2] * 255}),
            rgb(${colors[2][0] * 255}, ${colors[2][1] * 255}, ${colors[2][2] * 255}))`,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
