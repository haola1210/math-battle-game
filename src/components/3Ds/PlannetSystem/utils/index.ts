/**
 * @format
 * @param x
 * @param y (x^2)/(a^2) + (y^2)/(b^2) = 1
 */

export const genInitPosSatellite = (a: number, b: number, initialY = 0) => {
  const initalX = Math.sqrt(a * a * (1 - (initialY * initialY) / (b * b)));
  return {
    x: initalX,
    y: initialY,
  };
};
