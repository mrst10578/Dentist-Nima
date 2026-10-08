import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  RingGeometry,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

import { createCrownGeometry, createTaperedRootGeometry } from "./tooth-geometry";

type Disposable = { dispose: () => void };
const disposable = (value: unknown): value is Disposable =>
  typeof value === "object" && value !== null && "dispose" in value &&
  typeof value.dispose === "function";

/**
 * Mount an isolated Three.js scene. All resources, observers and listeners
 * are released on unmount, including when React Strict Mode remounts.
 */
export function mountBioGlassScene(host: HTMLElement): () => void {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.42;
  renderer.domElement.className = "bioglass-webgl";
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(33, 1, 0.1, 50);
  camera.position.set(0.2, 0.25, 5.8);
  camera.lookAt(0, 0, 0);
  scene.add(new AmbientLight(0xffffff, 1.05));
  scene.add(new HemisphereLight(0xf7ffff, 0x63bbd2, 2.1));

  function directional(color: number, power: number, x: number, y: number, z: number) {
    const light = new DirectionalLight(color, power);
    light.position.set(x, y, z);
    scene.add(light);
  }
  directional(0xffffff, 3.0, -3, 5, 5);
  directional(0x64e2f3, 2.6, 3, 0, -4);
  directional(0xc0ebff, 1.3, -5, -1, -2);

  const tooth = new Group();
  tooth.position.y = 0.05;
  tooth.rotation.set(-0.16, -0.45, 0.07);
  scene.add(tooth);

  const enamel = new MeshPhysicalMaterial({
    color: new Color("#e6fdff"),
    metalness: 0.07,
    roughness: 0.13,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    transmission: 0.2,
    thickness: 0.65,
    ior: 1.34,
    transparent: true,
    opacity: 0.96,
    side: DoubleSide,
  });
  const rootMaterial = new MeshPhysicalMaterial({
    color: new Color("#a9e0e8"),
    metalness: 0.1,
    roughness: 0.24,
    clearcoat: 0.9,
    transmission: 0.08,
    thickness: 0.28,
    transparent: true,
    opacity: 0.96,
    side: DoubleSide,
  });
  const crown = new Mesh(createCrownGeometry(), enamel);
  tooth.add(crown);

  // Artistic three-root system, subtly diverging like a molar.
  const roots: Vector3[][] = [
    [new Vector3(-0.32, -0.18, 0.17), new Vector3(-0.38, -0.55, 0.18), new Vector3(-0.52, -1.15, 0.10), new Vector3(-0.69, -1.72, 0.01)],
    [new Vector3(0.30, -0.18, 0.2), new Vector3(0.42, -0.57, 0.24), new Vector3(0.54, -1.12, 0.28), new Vector3(0.65, -1.66, 0.20)],
    [new Vector3(0.02, -0.18, -0.2), new Vector3(0.01, -0.6, -0.27), new Vector3(0.07, -1.24, -0.42), new Vector3(-0.05, -1.7, -0.43)],
  ];
  for (const root of roots) tooth.add(new Mesh(createTaperedRootGeometry(root, 0.205), rootMaterial));

  // A restrained internal blue core gives the porcelain real visual depth.
  const pulp = new Mesh(
    new SphereGeometry(0.34, 32, 24),
    new MeshPhysicalMaterial({
      color: new Color("#69c7d8"),
      roughness: 0.24,
      emissive: new Color("#1c9dbb"),
      emissiveIntensity: 0.18,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    }),
  );
  pulp.scale.set(0.9, 1.22, 0.75);
  pulp.position.y = 0.33;
  tooth.add(pulp);

  const orbit = new Group();
  orbit.rotation.x = -0.31;
  scene.add(orbit);
  const ringMaterial = new MeshStandardMaterial({
    color: new Color("#6ac9d8"),
    metalness: 0.56,
    roughness: 0.22,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
  });
  const orbitA = new Mesh(new TorusGeometry(1.78, 0.006, 8, 140), ringMaterial);
  orbitA.rotation.set(0.7, 0.2, 0.24);
  orbit.add(orbitA);
  const orbitB = new Mesh(new TorusGeometry(1.98, 0.0035, 8, 140), ringMaterial);
  orbitB.rotation.set(1.27, -0.14, 0.18);
  orbit.add(orbitB);
  const orbitC = new Mesh(new RingGeometry(1.42, 1.425, 96), new MeshStandardMaterial({
    color: 0xc5f5fc, transparent: true, opacity: 0.32, side: DoubleSide, depthWrite: false,
  }));
  orbitC.rotation.x = 1.28;
  orbit.add(orbitC);

  // Seeded positions give stable particles and no hydration randomness.
  const count = 72;
  const positions = new Float32Array(count * 3);
  let seed = 90417;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    const radius = 1.6 + random() * 1.1;
    const angle = random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = -1.6 + random() * 3.8;
    positions[i * 3 + 2] = Math.sin(angle) * radius - 0.35;
  }
  const sparkleGeo = new BufferGeometry();
  sparkleGeo.setAttribute("position", new BufferAttribute(positions, 3));
  const sparkles = new Points(sparkleGeo, new PointsMaterial({
    color: 0x5ec5dc, size: 0.024, sizeAttenuation: true, transparent: true,
    opacity: 0.66, depthWrite: false, blending: AdditiveBlending,
  }));
  scene.add(sparkles);

  const guideLineMaterial = new LineBasicMaterial({ color: 0x9cdeeb, transparent: true, opacity: 0.34 });
  const guideGeo = new BufferGeometry().setFromPoints([
    new Vector3(-2.15, -1.7, -0.4), new Vector3(-2.15, 1.65, -0.4),
  ]);
  scene.add(new Line(guideGeo, guideLineMaterial));

  const clock = new Clock();
  let visible = true;
  let drag = false;
  let dragX = 0;
  let targetYaw = -0.45;
  let pointerX = 0;
  let pointerY = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "touch") return; // preserve mobile scrolling
    drag = true;
    dragX = event.clientX;
    host.setPointerCapture?.(event.pointerId);
  };
  const onPointerUp = () => { drag = false; };
  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    if (drag) {
      targetYaw += (event.clientX - dragX) * 0.009;
      dragX = event.clientX;
    }
  };
  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("pointerup", onPointerUp);
  host.addEventListener("pointercancel", onPointerUp);
  host.addEventListener("pointermove", onPointerMove);

  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const portrait = width < 450;
    camera.aspect = width / height;
    camera.position.z = portrait ? 6.55 : 5.8;
    camera.updateProjectionMatrix();
    renderer.setSize(Math.round(width), Math.round(height), false);
    renderer.render(scene, camera);
  }

  function animate() {
    const t = clock.getElapsedTime();
    const drift = reducedMotion ? 0 : t;
    tooth.position.y = 0.05 + Math.sin(drift * 0.66) * (reducedMotion ? 0 : 0.067);
    const yaw = targetYaw + (reducedMotion ? 0 : Math.sin(drift * 0.19) * 0.13);
    tooth.rotation.y += (yaw - tooth.rotation.y) * 0.048;
    tooth.rotation.x += ((-0.16 + pointerY * 0.07) - tooth.rotation.x) * 0.04;
    orbit.rotation.z = reducedMotion ? 0 : Math.sin(drift * 0.16) * 0.11;
    sparkles.rotation.y = reducedMotion ? 0 : drift * 0.014;
    camera.position.x += ((pointerX * 0.12) - camera.position.x) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  const start = () => {
    if (visible) renderer.setAnimationLoop(animate);
    else renderer.setAnimationLoop(null);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    start();
  }, { threshold: 0.01 });
  observer.observe(host);
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  resize();
  start();

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    sizeObserver.disconnect();
    host.removeEventListener("pointerdown", onPointerDown);
    host.removeEventListener("pointerup", onPointerUp);
    host.removeEventListener("pointercancel", onPointerUp);
    host.removeEventListener("pointermove", onPointerMove);
    scene.traverse((object) => {
      if (!(object instanceof Mesh || object instanceof Points || object instanceof Line)) return;
      if (disposable(object.geometry)) object.geometry.dispose();
      const material = object.material;
      for (const entry of Array.isArray(material) ? material : [material]) {
        if (disposable(entry)) entry.dispose();
      }
    });
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
