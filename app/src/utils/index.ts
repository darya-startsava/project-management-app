type TRandNumber = (max: number, min?: number) => number;

export const randNumber: TRandNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
