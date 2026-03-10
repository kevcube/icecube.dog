import * as THREE from "three";

const ringMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xb88949,
  metalness: 0.88,
  roughness: 0.22,
  clearcoat: 1,
  clearcoatRoughness: 0.12,
});

const ringAccentMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xe7c98a,
  metalness: 0.86,
  roughness: 0.16,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
});

const diamondMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x956034,
  metalness: 0.8,
  roughness: 0.25,
  clearcoat: 0.95,
  clearcoatRoughness: 0.12,
});

const diamondAccentMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc5975d,
  metalness: 0.76,
  roughness: 0.22,
  clearcoat: 0.92,
  clearcoatRoughness: 0.1,
});

function createCircleStuddedRing() {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.16, 36, 144),
    ringMaterial,
  );
  group.add(ring);

  const studGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.16, 32);
  const studOffset = 1.38;

  for (const angle of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
    const stud = new THREE.Mesh(studGeometry, ringAccentMaterial);
    stud.position.set(
      Math.cos(angle) * studOffset,
      Math.sin(angle) * studOffset,
      0.02,
    );
    group.add(stud);
  }

  return group;
}

function createDiamondRing() {
  const outer = 1.18;
  const inner = 0.8;
  const shape = new THREE.Shape();

  shape.moveTo(0, outer);
  shape.lineTo(outer, 0);
  shape.lineTo(0, -outer);
  shape.lineTo(-outer, 0);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(0, inner);
  hole.lineTo(-inner, 0);
  hole.lineTo(0, -inner);
  hole.lineTo(inner, 0);
  hole.closePath();
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.045,
    bevelThickness: 0.05,
    curveSegments: 8,
  });
  geometry.center();

  const group = new THREE.Group();
  const diamond = new THREE.Mesh(geometry, diamondMaterial);
  group.add(diamond);

  const finialGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.16);
  const finialOffset = 1.5;
  const finialPoints: [number, number][] = [
    [0, finialOffset],
    [finialOffset, 0],
    [0, -finialOffset],
    [-finialOffset, 0],
  ];

  for (const [x, y] of finialPoints) {
    const finial = new THREE.Mesh(finialGeometry, diamondAccentMaterial);
    finial.position.set(x, y, 0.02);
    group.add(finial);
  }

  return group;
}

function createHusbandSymbol() {
  const group = new THREE.Group();

  const first = createCircleStuddedRing();
  first.position.set(-0.82, 0, 0);
  group.add(first);

  const second = createCircleStuddedRing();
  second.position.set(0.82, 0, 0.02);
  group.add(second);

  return group;
}

function createWifeSymbol() {
  const group = new THREE.Group();

  const first = createDiamondRing();
  first.position.set(-0.84, 0, 0);
  group.add(first);

  const second = createDiamondRing();
  second.position.set(0.84, 0, 0.02);
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

  const camera = new THREE.OrthographicCamera(-7, 7, 4.6, -4.6, 0.1, 30);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const husband = createHusbandSymbol();
  husband.position.set(-3.15, 0, 0);
  scene.add(husband);

  const wife = createWifeSymbol();
  wife.position.set(3.15, 0, 0);
  scene.add(wife);

  const ambient = new THREE.AmbientLight(0xf8eee0, 2.2);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff3de, 1.9);
  key.position.set(2, 4, 7);
  scene.add(key);

  const fill = new THREE.PointLight(0xabcff4, 14, 20, 2);
  fill.position.set(-3, 2, 6);
  scene.add(fill);

  const rim = new THREE.PointLight(0xffd29c, 10, 16, 2);
  rim.position.set(5, -1, 5);
  scene.add(rim);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width), 1);
    const height = Math.max(Math.floor(rect.height), 1);
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const vertical = 4.6;
    camera.left = -vertical * aspect;
    camera.right = vertical * aspect;
    camera.top = vertical;
    camera.bottom = -vertical;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };

  resize();
  window.addEventListener("resize", resize);
  renderer.render(scene, camera);
}

const canvas = document.getElementById("marriage-symbol-canvas");

if (canvas instanceof HTMLCanvasElement) {
  buildScene(canvas);
}
