export const required = (value) => {
  return !value && `es requerido`;
};

export const length = (minLen, maxLen = Infinity) => {
  return (value) => {
    return (
      !(value.length >= minLen && value.length <= maxLen) &&
      "longitud no valida"
    );
  };
};
