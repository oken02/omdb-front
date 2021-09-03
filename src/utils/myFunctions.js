export const mapObj = (object, callback) => {
  const res = {};
  for (const key in object) {
    const call = callback(key, object[key], res);
    for (const key2 in call) {
      res[key2] = call[key2];
    }
  }

  return res;
};
