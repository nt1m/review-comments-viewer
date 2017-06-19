const Settings = {
  get(item) {
    return localStorage.getItem(item) || "";
  },
  set(item, value) {
    return localStorage.setItem(item, value);
  }
};