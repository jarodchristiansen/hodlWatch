export const numberWithCommas = (x, digits = 15) => {
  return x
    .toPrecision(digits)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPercentage = (value) => {
  const percentage = value.toFixed(2);
  const parts = percentage.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${parts.join(".")}%`;
};
