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

const symbolMaterials = [
  circleMaterial,
  ringAccentMaterial,
  diamondMaterial,
  diamondAccentMaterial,
];

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

function sampledArcPoints(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  segments: number,
) {
  const points: THREE.Vector2[] = [];

  for (let step = 0; step <= segments; step += 1) {
    const t = step / segments;
    const angle = startAngle + (endAngle - startAngle) * t;
    points.push(
      new THREE.Vector2(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius,
      ),
    );
  }

  return points;
}

function ensureClockwise(points: THREE.Vector2[]) {
  return THREE.ShapeUtils.isClockWise(points) ? points : [...points].reverse();
}

function ensureCounterClockwise(points: THREE.Vector2[]) {
  return THREE.ShapeUtils.isClockWise(points) ? [...points].reverse() : points;
}

function createCircleUnionContour(radius: number, offset: number, segments: number) {
  const alpha = Math.acos(offset / radius);
  const leftArc = sampledArcPoints(-offset, 0, radius, alpha, Math.PI * 2 - alpha, segments);
  const rightArc = sampledArcPoints(
    offset,
    0,
    radius,
    Math.PI + alpha,
    Math.PI * 3 - alpha,
    segments,
  );

  return ensureCounterClockwise([...leftArc, ...rightArc.slice(1, -1)]);
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

function createDiamondUnionContour(radius: number, offset: number) {
  return ensureCounterClockwise([
    new THREE.Vector2(0, radius - offset),
    new THREE.Vector2(-offset, radius),
    new THREE.Vector2(-(offset + radius), 0),
    new THREE.Vector2(-offset, -radius),
    new THREE.Vector2(0, -(radius - offset)),
    new THREE.Vector2(offset, -radius),
    new THREE.Vector2(offset + radius, 0),
    new THREE.Vector2(offset, radius),
  ]);
}

function createMergedHusbandBase() {
  const outerPoints = createCircleUnionContour(0.92, 0.56, 48);
  const innerPoints = createCircleUnionContour(0.69, 0.56, 48);
  const shape = new THREE.Shape(outerPoints);
  shape.holes.push(new THREE.Path(ensureClockwise(innerPoints)));

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 64,
  });
  geometry.center();

  return new THREE.Mesh(geometry, circleMaterial);
}

function createMergedWifeBase() {
  const outerPoints = createDiamondUnionContour(0.96, 0.58);
  const innerPoints = createDiamondUnionContour(0.74, 0.58);
  const shape = new THREE.Shape(outerPoints);
  shape.holes.push(new THREE.Path(ensureClockwise(innerPoints)));

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 8,
  });
  geometry.center();

  return new THREE.Mesh(geometry, diamondMaterial);
}

function createHusbandSymbol() {
  const group = new THREE.Group();
  group.add(createMergedHusbandBase());

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

function createWifeSymbol() {
  const group = new THREE.Group();
  group.add(createMergedWifeBase());

  const outer = 0.96;
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
      for (const material of symbolMaterials) {
        material.transparent = false;
        material.opacity = 1;
      }

      const mobileScale = 2.96;
      const husbandEdge = halfWidth - husbandExtent * mobileScale * 0.35;
      const wifeEdge = halfWidth - wifeExtent * mobileScale * 0.35;

      husband.rotation.x = 0;
      wife.rotation.x = 0;

      husband.scale.setScalar(mobileScale);
      husband.position.set(
        THREE.MathUtils.lerp(-husbandEdge, husbandEdge, progress),
        halfHeight * 0.1,
        0,
      );

      wife.scale.setScalar(mobileScale);
      wife.position.set(
        THREE.MathUtils.lerp(wifeEdge, -wifeEdge, progress),
        -halfHeight * 0.6,
        0,
      );
    } else {
      circleMaterial.transparent = true;
      circleMaterial.opacity = 0.68;
      ringAccentMaterial.transparent = true;
      ringAccentMaterial.opacity = 0.58;
      diamondMaterial.transparent = true;
      diamondMaterial.opacity = 0.68;
      diamondAccentMaterial.transparent = true;
      diamondAccentMaterial.opacity = 0.58;

      const husbandEdge = halfWidth - husbandExtent * 2.05 * 0.83;
      const wifeEdge = halfWidth - wifeExtent * 2.05 * 0.83;
      const spin = progress * Math.PI;

      husband.scale.setScalar(2.05);
      husband.position.set(-husbandEdge, -0.08, 0);
      husband.rotation.x = spin;

      wife.scale.setScalar(2.05);
      wife.position.set(wifeEdge, 0.08, 0);
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
