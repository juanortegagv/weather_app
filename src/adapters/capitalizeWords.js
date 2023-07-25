const capitalizeWords = (str) => {
  return str && str.replace(/\b\w/g, (match) => match.toUpperCase());
};
export default capitalizeWords;
