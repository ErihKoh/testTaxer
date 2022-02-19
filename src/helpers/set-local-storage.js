const setStorage = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item.result));
};

export default setStorage;
