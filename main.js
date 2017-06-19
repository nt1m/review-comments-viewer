const stateManager = new StateManager({
  renderer(state) {
    let root = document.getElementById("root");
    ReactDOM.render(App(), root);
  },
  initialState: {
    setupDone: false,
    opened: [],
    resolved: [],
    selectedTab: "opened",
  },
});

stateManager.render();
function setupGithub() {
  const github = new GithubConnector({
    owner: Settings.get("github.owner"),
    repoName: Settings.get("github.repo"),
    pullRequest: Settings.get("github.pr"),
  });

  github.getReviewComments().then(comments => {
    stateManager.setState({ opened: comments });
  });
}

if (window.parent) {
  let initPort = ({ data }) => {
    let domain = getDomain(data.origin);
    if (AUTHORIZED_DOMAINS.includes(domain)) {
      window.port = new Port({ domain: data.origin, targetWindow: parent });
      window.removeEventListener("message", initPort);
    }
  }

  window.addEventListener("message", initPort);
}
