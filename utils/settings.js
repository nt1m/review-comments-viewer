const Settings = {
  get(item) {
    let value = localStorage.getItem(item);
    try {
      return JSON.parse(value) || [];
    } catch (e) {
      return value || "";
    }
  },
  set(item, value) {
    try {
      return localStorage.setItem(item, JSON.stringify(value));
    } catch (e) {
      return localStorage.setItem(item, value);
    }
  }
};