import { vec } from 'mafs';

export const didCollideCircle = (cVec: vec.Vector2, r: number, pVec: vec.Vector2) => {
  const distance = vec.dist(cVec, pVec);

  if (Math.abs(distance) <= r) {
    return true;
  }

  return false;
};

// Function to calculate the vertices of a regular polygon
export function calculateRegularPolygonVertices(
  center: vec.Vector2,
  sides: number,
  radius: number,
): vec.Vector2[] {
  const vertices: vec.Vector2[] = [];

  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides;
    const x_vertex = center[0] + radius * Math.cos(angle);
    const y_vertex = center[1] + radius * Math.sin(angle);
    vertices.push([x_vertex, y_vertex] as vec.Vector2);
  }

  return vertices;
}

export const didCollideConvexPolygon = (polygon: vec.Vector2[], point: vec.Vector2) => {
  let isInside = false;
  const n = polygon.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    const intersect =
      yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
};
