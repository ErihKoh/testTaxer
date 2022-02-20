const setStorage = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

export default setStorage;
