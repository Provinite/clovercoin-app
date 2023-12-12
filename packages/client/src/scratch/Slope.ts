export enum Slope {
  Up,
  Down,
  Flat,
}

export const signToSlope = (sign: number): Slope =>
  sign === 0 ? Slope.Flat : sign > 0 ? Slope.Up : Slope.Down;
