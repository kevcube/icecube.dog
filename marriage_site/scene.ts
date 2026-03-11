import * as THREE from "three";

const circleMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xe6ddcf,
  metalness: 0.3,
  roughness: 0.82,
  clearcoat: 0.1,
  clearcoatRoughness: 0.9,
});

const ringAccentMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xdfd5c7,
  metalness: 0.22,
  roughness: 0.86,
  clearcoat: 0.08,
  clearcoatRoughness: 0.92,
});

const diamondMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xd8d0c4,
  metalness: 0.28,
  roughness: 0.84,
  clearcoat: 0.08,
  clearcoatRoughness: 0.94,
});

const diamondAccentMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xd2cabf,
  metalness: 0.24,
  roughness: 0.88,
  clearcoat: 0.06,
  clearcoatRoughness: 0.96,
});

function createRingShape(outerRadius: number, innerRadius: number) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 64,
  });
}

function createDiamondShape(outer: number, inner: number) {
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

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 8,
  });
}

function createCircleStuddedRing() {
  const group = new THREE.Group();
  const ringGeometry = createRingShape(0.92, 0.69);
  ringGeometry.center();
  group.add(new THREE.Mesh(ringGeometry, circleMaterial));

  const studRadius = 0.11;
  const studGeometry = new THREE.CylinderGeometry(
    studRadius,
    studRadius,
    0.08,
    32,
  );
  studGeometry.rotateX(Math.PI / 2);
  const studOffset = 1.03;
  const cardinals: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (const [x, y] of cardinals) {
    const stud = new THREE.Mesh(studGeometry, ringAccentMaterial);
    stud.position.set(x * studOffset, y * studOffset, 0);
    group.add(stud);
  }

  return group;
}

function createDiamondRing() {
  const outer = 0.96;
  const inner = 0.74;
  const geometry = createDiamondShape(outer, inner);
  geometry.center();

  const group = new THREE.Group();
  const diamond = new THREE.Mesh(geometry, diamondMaterial);
  group.add(diamond);

  const finialSize = 0.22;
  const finialGeometry = new THREE.BoxGeometry(finialSize, finialSize, 0.08);
  const finialHalfDiagonal = finialSize / Math.sqrt(2);
  const finialOffset = outer + finialHalfDiagonal;
  const finialPoints: [number, number][] = [
    [0, finialOffset],
    [finialOffset, 0],
    [0, -finialOffset],
    [-finialOffset, 0],
  ];

  for (const [x, y] of finialPoints) {
    const finial = new THREE.Mesh(finialGeometry, diamondAccentMaterial);
    finial.rotation.z = Math.PI / 4;
    finial.position.set(x, y, 0);
    group.add(finial);
  }

  return group;
}

function createHusbandSymbol() {
  const group = new THREE.Group();

  const first = createCircleStuddedRing();
  first.position.set(-0.56, 0, 0);
  group.add(first);

  const second = createCircleStuddedRing();
  second.position.set(0.56, 0, 0.01);
  group.add(second);

  return group;
}

function createWifeSymbol() {
  const group = new THREE.Group();

  const first = createDiamondRing();
  first.position.set(-0.58, 0, 0);
  group.add(first);

  const second = createDiamondRing();
  second.position.set(0.58, 0, 0.01);
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

  const camera = new THREE.OrthographicCamera(-5.4, 5.4, 3.4, -3.4, 0.1, 30);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const husband = createHusbandSymbol();
  scene.add(husband);

  const wife = createWifeSymbol();
  scene.add(wife);

  const ambient = new THREE.AmbientLight(0xffffff, 1.45);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xf7f5f1, 1.2);
  key.position.set(0, 3.2, 8);
  scene.add(key);

  const bounce = new THREE.DirectionalLight(0xf1ece4, 0.7);
  bounce.position.set(0, -3.6, -6);
  scene.add(bounce);

  const fill = new THREE.PointLight(0xf4f2ed, 1.1, 20, 2);
  fill.position.set(-3.4, 0.8, 5.5);
  scene.add(fill);

  const rim = new THREE.PointLight(0xf4f2ed, 1.6, 18, 2);
  rim.position.set(3.4, -0.8, 6.5);
  scene.add(rim);

  const layout = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width), 1);
    const height = Math.max(Math.floor(rect.height), 1);
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const halfWidth = 5.4;
    const halfHeight = halfWidth / aspect;
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();

    const mobile = aspect < 0.9;
    const husbandExtent = 1.7;
    const wifeExtent = 1.66;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

    if (mobile) {
      const mobileScale = 2.96;
      const husbandEdge = halfWidth - husbandExtent * mobileScale * 1.06;
      const wifeEdge = halfWidth - wifeExtent * mobileScale * 1.06;

      husband.rotation.x = 0;
      wife.rotation.x = 0;

      husband.scale.setScalar(mobileScale);
      husband.position.set(
        THREE.MathUtils.lerp(-husbandEdge, husbandEdge, progress),
        halfHeight * 0.35,
        0,
      );

      wife.scale.setScalar(mobileScale);
      wife.position.set(
        THREE.MathUtils.lerp(wifeEdge, -wifeEdge, progress),
        -halfHeight * 0.35,
        0,
      );
    } else {
      const husbandEdge = halfWidth - husbandExtent * 2.05 * 0.83;
      const wifeEdge = halfWidth - wifeExtent * 2.05 * 0.83;
      const spin = progress * Math.PI;

      husband.scale.setScalar(2.05);
      husband.position.set(-husbandEdge, 0.03, 0);
      husband.rotation.x = spin;

      wife.scale.setScalar(2.05);
      wife.position.set(wifeEdge, -0.03, 0);
      wife.rotation.x = -spin;
    }

    renderer.render(scene, camera);
  };

  layout();
  window.addEventListener("resize", layout);
  window.addEventListener("scroll", layout, { passive: true });
  renderer.render(scene, camera);
}

const canvas = document.getElementById("marriage-symbol-canvas");

if (canvas instanceof HTMLCanvasElement) {
  buildScene(canvas);
}
