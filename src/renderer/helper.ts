export const flatten = (array: any[][]) => {
  return [].concat.apply([], array);
};

export const getMaxValue = (array: number[]) => {
  return array.reduce((x, y) => {
    if (isNaN(x)) {
      return y;
    }
    if (isNaN(y)) {
      return x;
    }

    return x < y ? y : x;
  });
};

export const getMinValue = (array: number[]) => {
  return array.reduce((x, y) => {
    if (isNaN(x)) {
      return y;
    }
    if (isNaN(y)) {
      return x;
    }

    return x < y ? x : y;
  });
};
