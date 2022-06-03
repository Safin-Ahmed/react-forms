export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const mapStateToValues = (state) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur].value;
    return acc;
  }, {});
};
