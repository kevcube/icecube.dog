// WebGPU Type Definitions
interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
  getPreferredCanvasFormat(): GPUTextureFormat;
}

interface Navigator {
  readonly gpu: GPU;
}

type GPUTextureFormat = string;

interface GPURequestAdapterOptions {
  powerPreference?: 'low-power' | 'high-performance';
}

interface GPUAdapter {
  requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
}

interface GPUDeviceDescriptor {
  requiredFeatures?: string[];
  requiredLimits?: Record<string, number>;
}

interface GPUDevice {
  createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
  createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  createBindGroupLayout(descriptor: GPUBindGroupLayoutDescriptor): GPUBindGroupLayout;
  createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
  createPipelineLayout(descriptor: GPUPipelineLayoutDescriptor): GPUPipelineLayout;
  createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline;
  createCommandEncoder(descriptor?: GPUCommandEncoderDescriptor): GPUCommandEncoder;
  queue: GPUQueue;
}

interface GPUQueue {
  writeBuffer(buffer: GPUBuffer, offset: number, data: ArrayBuffer | ArrayBufferView): void;
  submit(commandBuffers: GPUCommandBuffer[]): void;
}

interface GPUShaderModuleDescriptor {
  code: string;
}

interface GPUShaderModule {}

interface GPUBufferDescriptor {
  size: number;
  usage: number;
}

interface GPUBuffer {}

interface GPUBindGroupLayoutDescriptor {
  entries: GPUBindGroupLayoutEntry[];
}

interface GPUBindGroupLayoutEntry {
  binding: number;
  visibility: number;
  buffer?: {
    type?: string;
  };
}

interface GPUBindGroupLayout {}

interface GPUBindGroupDescriptor {
  layout: GPUBindGroupLayout;
  entries: GPUBindGroupEntry[];
}

interface GPUBindGroupEntry {
  binding: number;
  resource: {
    buffer: GPUBuffer;
  };
}

interface GPUBindGroup {}

interface GPUPipelineLayoutDescriptor {
  bindGroupLayouts: GPUBindGroupLayout[];
}

interface GPUPipelineLayout {}

interface GPURenderPipelineDescriptor {
  layout: GPUPipelineLayout;
  vertex: GPUVertexState;
  fragment?: GPUFragmentState;
  primitive?: GPUPrimitiveState;
}

interface GPUVertexState {
  module: GPUShaderModule;
  entryPoint: string;
}

interface GPUFragmentState {
  module: GPUShaderModule;
  entryPoint: string;
  targets: GPUColorTargetState[];
}

interface GPUColorTargetState {
  format: GPUTextureFormat;
}

interface GPUPrimitiveState {
  topology?: string;
}

interface GPURenderPipeline {}

interface GPUCommandEncoderDescriptor {}

interface GPUCommandEncoder {
  beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
  finish(): GPUCommandBuffer;
}

interface GPURenderPassDescriptor {
  colorAttachments: (GPURenderPassColorAttachment | null)[];
}

interface GPURenderPassColorAttachment {
  view: GPUTextureView;
  clearValue?: { r: number; g: number; b: number; a: number };
  loadOp: string;
  storeOp: string;
}

interface GPURenderPassEncoder {
  setPipeline(pipeline: GPURenderPipeline): void;
  setBindGroup(index: number, bindGroup: GPUBindGroup): void;
  draw(vertexCount: number): void;
  end(): void;
}

interface GPUCommandBuffer {}

interface GPUCanvasContext {
  configure(configuration: GPUCanvasConfiguration): void;
  getCurrentTexture(): GPUTexture;
}

interface GPUCanvasConfiguration {
  device: GPUDevice;
  format: GPUTextureFormat;
  alphaMode?: string;
}

interface GPUTexture {
  createView(): GPUTextureView;
}

interface GPUTextureView {}

interface HTMLCanvasElement {
  getContext(contextId: 'webgpu'): GPUCanvasContext | null;
}
