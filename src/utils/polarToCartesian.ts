export interface Point {
  x: number;
  y: number;
}

/** Converte coordenadas polares (ângulo em graus, raio em %) para cartesianas no espaço 0–100. */
export function polarToCartesian(angleDegrees: number, radius: number): Point {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(radians),
    y: 50 + radius * Math.sin(radians),
  };
}
