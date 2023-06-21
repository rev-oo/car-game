export function rotatePoint(x: number, y: number, degree: number): { x: number; y: number } {
  const radian = (degree * Math.PI) / 180;
  const newX = x * Math.cos(radian) - y * Math.sin(radian);
  const newY = x * Math.sin(radian) + y * Math.cos(radian);
  return { x: newX, y: newY };
}
