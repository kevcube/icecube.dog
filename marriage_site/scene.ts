import {
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
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

type TooltipCopy = {
  titleMn: string;
  titleEn: string;
  bodyMn: string;
  bodyEn: string;
};

const cardinalNames = {
  mn: ["Дээд", "Баруун", "Доод", "Зүүн"],
  en: ["Top", "Right", "Bottom", "Left"],
};

const husbandTooltipBody = {
  mn: "Гаднах дугуй чимэг нь хосыг тойрсон ураг төрлийн хэлхээ, хүрээллийг сануулна.",
  en: "The outer circular finial suggests the kinship and family ties surrounding the couple.",
};

const wifeTooltipBody = {
  mn: "Гаднах ромбон чимэг нь айл гэрийн түшиг, залгамж ба хамгааллын утгыг давтана.",
  en: "The outer rhombus finial echoes support, continuity, and protection around the household.",
};

function createTooltipCopy(
  names: typeof cardinalNames,
  index: number,
  nounMn: string,
  nounEn: string,
  bodyMn: string,
  bodyEn: string,
): TooltipCopy {
  return {
    titleMn: `${names.mn[index]} ${nounMn}`,
    titleEn: `${names.en[index]} ${nounEn}`,
    bodyMn,
    bodyEn,
  };
}

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

function createDiamondShape(
  outerX: number,
  outerY: number,
  innerX: number,
  innerY: number,
) {
  const shape = new THREE.Shape();

  shape.moveTo(0, outerY);
  shape.lineTo(outerX, 0);
  shape.lineTo(0, -outerY);
  shape.lineTo(-outerX, 0);
  shape.closePath();

  const hole = new THREE.Path();
  hole.moveTo(0, innerY);
  hole.lineTo(-innerX, 0);
  hole.lineTo(0, -innerY);
  hole.lineTo(innerX, 0);
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

  for (const [index, [x, y]] of cardinals.entries()) {
    const stud = new THREE.Mesh(studGeometry, ringAccentMaterial);
    stud.position.set(x * studOffset, y * studOffset, 0);
    stud.userData.tooltip = createTooltipCopy(
      cardinalNames,
      index,
      "дугуй чимэг",
      "circle finial",
      husbandTooltipBody.mn,
      husbandTooltipBody.en,
    );
    group.add(stud);
  }

  return group;
}

function createDiamondRing() {
  const outerX = 1.08;
  const outerY = 0.874;
  const innerX = 0.84;
  const innerY = 0.654;
  const geometry = createDiamondShape(outerX, outerY, innerX, innerY);
  geometry.center();

  const group = new THREE.Group();
  const diamond = new THREE.Mesh(geometry, diamondMaterial);
  group.add(diamond);

  const finialOuterX = 0.145;
  const finialOuterY = 0.118;
  const finialGeometry = new THREE.ExtrudeGeometry(
    new THREE.Shape([
      new THREE.Vector2(0, finialOuterY),
      new THREE.Vector2(finialOuterX, 0),
      new THREE.Vector2(0, -finialOuterY),
      new THREE.Vector2(-finialOuterX, 0),
    ]),
    {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
      curveSegments: 4,
    },
  );
  finialGeometry.center();
  const finialPoints: [number, number][] = [
    [0, outerY + finialOuterY * 0.72],
    [outerX + finialOuterX * 0.72, 0],
    [0, -(outerY + finialOuterY * 0.72)],
    [-(outerX + finialOuterX * 0.72), 0],
  ];

  for (const [index, [x, y]] of finialPoints.entries()) {
    const finial = new THREE.Mesh(finialGeometry, diamondAccentMaterial);
    finial.position.set(x, y, 0);
    finial.userData.tooltip = createTooltipCopy(
      cardinalNames,
      index,
      "ромбон чимэг",
      "rhombus finial",
      wifeTooltipBody.mn,
      wifeTooltipBody.en,
    );
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
  second.position.set(0.56, 0, 0);
  group.add(second);

  return group;
}

function createWifeSymbol() {
  const group = new THREE.Group();

  const first = createDiamondRing();
  first.position.set(-0.58, 0, 0);
  group.add(first);

  const second = createDiamondRing();
  second.position.set(0.58, 0, 0);
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

  const interactiveMeshes: THREE.Mesh[] = [];
  husband.traverse((object) => {
    if (object instanceof THREE.Mesh && object.userData.tooltip) {
      interactiveMeshes.push(object);
    }
  });
  wife.traverse((object) => {
    if (object instanceof THREE.Mesh && object.userData.tooltip) {
      interactiveMeshes.push(object);
    }
  });

  const tooltip = document.createElement("aside");
  tooltip.setAttribute("hidden", "true");
  tooltip.setAttribute("aria-live", "polite");
  tooltip.style.position = "fixed";
  tooltip.style.top = "0";
  tooltip.style.left = "0";
  tooltip.style.zIndex = "20";
  tooltip.style.maxWidth = "18rem";
  tooltip.style.padding = "0.7rem 0.8rem";
  tooltip.style.background = "rgba(255, 255, 255, 0.94)";
  tooltip.style.border = "1px solid rgba(0, 0, 0, 0.08)";
  tooltip.style.borderRadius = "0.8rem";
  tooltip.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
  tooltip.style.color = "rgba(0, 0, 0, 0.82)";
  tooltip.style.font = "500 0.78rem/1.35 ui-sans-serif, system-ui, sans-serif";
  tooltip.style.letterSpacing = "0.01em";
  tooltip.style.pointerEvents = "none";
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity 120ms ease";
  document.body.append(tooltip);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered: THREE.Object3D | null = null;

  const hideTooltip = () => {
    hovered = null;
    canvas.style.cursor = "default";
    tooltip.style.opacity = "0";
    tooltip.setAttribute("hidden", "true");
  };

  const positionTooltip = async (clientX: number, clientY: number) => {
    const virtualReference = {
      getBoundingClientRect() {
        return new DOMRect(clientX, clientY, 0, 0);
      },
    };

    const position = await computePosition(virtualReference, tooltip, {
      placement: "top",
      middleware: [offset(14), flip(), shift({ padding: 12 })],
    });

    tooltip.style.transform = `translate(${position.x}px, ${position.y}px)`;
  };

  const showTooltip = (copy: TooltipCopy, clientX: number, clientY: number) => {
    tooltip.innerHTML = `<strong style="display:block;font-weight:600;">${copy.titleMn}</strong>
<span style="display:block;margin-top:0.08rem;opacity:0.9;">${copy.titleEn}</span>
<span style="display:block;margin-top:0.5rem;">${copy.bodyMn}</span>
<span style="display:block;margin-top:0.18rem;opacity:0.9;">${copy.bodyEn}</span>`;
    tooltip.removeAttribute("hidden");
    tooltip.style.opacity = "1";
    void positionTooltip(clientX, clientY);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      hideTooltip();
      return;
    }

    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
    const [hit] = raycaster.intersectObjects(interactiveMeshes, false);

    if (!hit || !hit.object.userData.tooltip) {
      hideTooltip();
      return;
    }

    canvas.style.cursor = "pointer";

    if (hovered !== hit.object) {
      hovered = hit.object;
      showTooltip(hit.object.userData.tooltip as TooltipCopy, event.clientX, event.clientY);
      return;
    }

    if (hovered) {
      void positionTooltip(event.clientX, event.clientY);
    }
  };

  const onPointerLeave = () => {
    hideTooltip();
  };

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
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);
  renderer.render(scene, camera);
}

const canvas = document.getElementById("marriage-symbol-canvas");

if (canvas instanceof HTMLCanvasElement) {
  buildScene(canvas);
}
