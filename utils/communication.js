const AUTHORIZED_DOMAINS = ["c9.io", "janitor.technology"];

function getDomain(url) {
  return new URL(url).host.split(".").slice(-2).join(".");
}

class Port {
  constructor({ domain, targetWindow }) {
    this.domain = domain;

    this.targetWindow = targetWindow;
    this.targetWindow.postMessage({ connected: true }, location.origin);
  }

  sendMessage(message, reply) {
    this.targetWindow.postMessage(message, this.domain);
    if (reply) {
      return new Promise(resolve => {
        window.addEventListener("message", resolve, { once: true });
      });
    }
    return Promise.resolve();
  }
}
