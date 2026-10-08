import {
  BufferGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  Vector3,
} from "three";

/**
 * An original, deliberately stylized four-cusp molar sculpture.
 * It is artistic anatomy, NOT a clinical or educationally exact model.
 * All surfaces are procedural so a reviewed GLB can replace them later.
 */
export function createCrownGeometry(): BufferGeometry {
  const segments = 72;
  const heights = 24;
  const vertices: number[] = [];
  const indices: number[] = [];

  const cusp = (theta: number) =>
    Math.pow(Math.max(0, Math.cos(4 * (theta - Math.PI / 4))), 2);

  // Smooth neck-to-crown widening with subtle four-lobed outline.
  for (let yIndex = 0; yIndex <= heights; yIndex++) {
    const t = yIndex / heights;
    const swelling = 0.62 + 0.38 * Math.sin(Math.PI * Math.min(0.8, t * 0.84));
    const topInfluence = Math.pow(t, 3);
    for (let segment = 0; segment < segments; segment++) {
      const theta = (segment / segments) * Math.PI * 2;
      const scallop = 1 + 0.065 * Math.cos(4 * (theta - Math.PI / 4));
      const rx = 0.66 * swelling * scallop;
      const rz = 0.56 * swelling * scallop;
      const y = -0.25 + 1.19 * t + topInfluence * (0.15 * cusp(theta) - 0.045);
      vertices.push(Math.cos(theta) * rx, y, Math.sin(theta) * rz);
    }
  }
  for (let row = 0; row < heights; row++) {
    for (let segment = 0; segment < segments; segment++) {
      const a = row * segments + segment;
      const b = row * segments + ((segment + 1) % segments);
      const c = (row + 1) * segments + segment;
      const d = (row + 1) * segments + ((segment + 1) % segments);
      indices.push(a, b, c, b, d, c);
    }
  }

  // Inset occlusal top: four distinct elevated cusps and a central fissure.
  const outerRow = heights * segments;
  const topRows = 14;
  for (let row = 1; row <= topRows; row++) {
    const radiusFraction = 1 - row / topRows;
    for (let segment = 0; segment < segments; segment++) {
      const theta = (segment / segments) * Math.PI * 2;
      const r = radiusFraction;
      const scallop = 1 + 0.065 * Math.cos(4 * (theta - Math.PI / 4));
      const x = Math.cos(theta) * 0.66 * scallop * r;
      const z = Math.sin(theta) * 0.56 * scallop * r;
      const cuspPeaks = 0.15 * cusp(theta) * Math.pow(r, 1.5);
      const fissure = 0.075 * (1 - r * r);
      const y = 0.895 + cuspPeaks - fissure;
      vertices.push(x, y, z);
    }
  }
  for (let row = 0; row < topRows; row++) {
    const startA = outerRow + row * segments;
    const startB = outerRow + (row + 1) * segments;
    for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      indices.push(startA + segment, startA + next, startB + segment);
      indices.push(startA + next, startB + next, startB + segment);
    }
  }

  // Cap the underside to avoid visible holes when the sculpture rotates.
  const bottomCenter = vertices.length / 3;
  vertices.push(0, -0.27, 0);
  for (let i = 0; i < segments; i++) {
    indices.push(bottomCenter, (i + 1) % segments, i);
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

export function createTaperedRootGeometry(points: Vector3[], width = 0.2): BufferGeometry {
  const curve = new CatmullRomCurve3(points);
  const tubularSegments = 30;
  const radialSegments = 12;
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const center = curve.getPointAt(t);
    const radius = width * Math.pow(1 - t, 0.8) + 0.007;
    for (let j = 0; j < radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const p = center
        .clone()
        .addScaledVector(frames.normals[i], x)
        .addScaledVector(frames.binormals[i], y);
      positions.push(p.x, p.y, p.z);
    }
  }
  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * radialSegments + j;
      const b = i * radialSegments + ((j + 1) % radialSegments);
      const c = (i + 1) * radialSegments + j;
      const d = (i + 1) * radialSegments + ((j + 1) % radialSegments);
      indices.push(a, c, b, b, c, d);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}
