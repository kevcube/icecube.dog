import * as THREE from "three";

function createCircularLink() {
  const geometry = new THREE.TorusGeometry(1.25, 0.17, 36, 140);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xb28447,
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });

  return new THREE.Mesh(geometry, material);
}

function createRoundedSquareLink() {
  const size = 2.1;
  const radius = 0.42;
  const shape = new THREE.Shape();

  shape.moveTo(-size / 2 + radius, -size / 2);
  shape.lineTo(size / 2 - radius, -size / 2);
  shape.quadraticCurveTo(size / 2, -size / 2, size / 2, -size / 2 + radius);
  shape.lineTo(size / 2, size / 2 - radius);
  shape.quadraticCurveTo(size / 2, size / 2, size / 2 - radius, size / 2);
  shape.lineTo(-size / 2 + radius, size / 2);
  shape.quadraticCurveTo(-size / 2, size / 2, -size / 2, size / 2 - radius);
  shape.lineTo(-size / 2, -size / 2 + radius);
  shape.quadraticCurveTo(-size / 2, -size / 2, -size / 2 + radius, -size / 2);

  const hole = new THREE.Path();
  const innerInset = 0.4;
  const innerSize = size - innerInset * 2;
  const innerRadius = Math.max(radius - 0.12, 0.16);

  hole.moveTo(-innerSize / 2 + innerRadius, -innerSize / 2);
  hole.lineTo(innerSize / 2 - innerRadius, -innerSize / 2);
  hole.quadraticCurveTo(
    innerSize / 2,
    -innerSize / 2,
    innerSize / 2,
    -innerSize / 2 + innerRadius,
  );
  hole.lineTo(innerSize / 2, innerSize / 2 - innerRadius);
  hole.quadraticCurveTo(
    innerSize / 2,
    innerSize / 2,
    innerSize / 2 - innerRadius,
    innerSize / 2,
  );
  hole.lineTo(-innerSize / 2 + innerRadius, innerSize / 2);
  hole.quadraticCurveTo(
    -innerSize / 2,
    innerSize / 2,
    -innerSize / 2,
    innerSize / 2 - innerRadius,
  );
  hole.lineTo(-innerSize / 2, -innerSize / 2 + innerRadius);
  hole.quadraticCurveTo(
    -innerSize / 2,
    -innerSize / 2,
    -innerSize / 2 + innerRadius,
    -innerSize / 2,
  );

  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 10,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.08,
    curveSegments: 28,
  });

  geometry.center();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x8e6130,
    metalness: 0.74,
    roughness: 0.28,
    clearcoat: 0.9,
    clearcoatRoughness: 0.14,
  });

  return new THREE.Mesh(geometry, material);
}

function createHusbandSymbol() {
  const group = new THREE.Group();

  const first = createCircularLink();
  first.position.set(-0.7, 0.02, 0);
  first.rotation.y = 0.95;
  first.rotation.x = 0.28;
  group.add(first);

  const second = createCircularLink();
  second.position.set(0.7, -0.02, 0.16);
  second.rotation.y = -0.95;
  second.rotation.x = -0.24;
  group.add(second);

  return group;
}

function createWifeSymbol() {
  const group = new THREE.Group();

  const first = createRoundedSquareLink();
  first.position.set(-0.72, 0.04, 0);
  first.rotation.y = 0.82;
  first.rotation.x = 0.16;
  group.add(first);

  const second = createRoundedSquareLink();
  second.position.set(0.72, -0.04, 0.18);
  second.rotation.y = -0.82;
  second.rotation.x = -0.22;
  group.add(second);

  return group;
}

function buildScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0.45, 10.6);

  const root = new THREE.Group();
  root.rotation.x = 0.32;
  root.rotation.z = -0.12;
  scene.add(root);

  const husband = createHusbandSymbol();
  husband.position.set(-2.2, 0.16, -0.3);
  husband.rotation.z = 0.16;
  root.add(husband);

  const wife = createWifeSymbol();
  wife.position.set(2.2, -0.12, 0.3);
  wife.rotation.z = -0.12;
  root.add(wife);

  const ambient = new THREE.AmbientLight(0xf6efe4, 1.9);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff6e4, 2.4);
  key.position.set(4, 6, 8);
  scene.add(key);

  const fill = new THREE.PointLight(0xa8d3ff, 26, 30, 2);
  fill.position.set(-4, -2, 4);
  scene.add(fill);

  const rim = new THREE.PointLight(0xffc98e, 18, 24, 2);
  rim.position.set(5, 2, -4);
  scene.add(rim);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pointerX = 0;
  let pointerY = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width), 1);
    const height = Math.max(Math.floor(rect.height), 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const onPointerLeave = () => {
    pointerX = 0;
    pointerY = 0;
  };

  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);

  const clock = new THREE.Clock();

  const render = () => {
    const elapsed = clock.getElapsedTime();
    const drift = motionQuery.matches ? 0 : elapsed;

    root.rotation.y = drift * 0.28 + pointerX * 0.18;
    root.rotation.x = 0.28 + Math.sin(drift * 0.7) * 0.08 + pointerY * 0.12;
    root.rotation.z = -0.08 + Math.cos(drift * 0.4) * 0.03;

    husband.position.y = 0.16 + Math.sin(drift * 0.85) * 0.08;
    husband.rotation.y = Math.sin(drift * 0.45) * 0.16;

    wife.position.y = -0.12 + Math.cos(drift * 0.8) * 0.08;
    wife.rotation.y = Math.cos(drift * 0.42) * 0.16;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
}

const canvas = document.getElementById("marriage-symbol-canvas");

if (canvas instanceof HTMLCanvasElement) {
  buildScene(canvas);
}
