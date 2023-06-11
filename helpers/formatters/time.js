export const FormatUnixTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const FormatUnixTimeWithTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
