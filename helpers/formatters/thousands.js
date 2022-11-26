export const numberWithCommas = (x, digits = 15) => {
  return x
    .toPrecision(digits)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
