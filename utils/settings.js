const Settings = {
  get(item) {
    let value = localStorage.getItem(item);
    try {
      if (value == null || value == undefined) {
        throw "no value";
      }
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