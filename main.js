const stateManager = new StateManager({
  renderer(state) {
    let root = document.getElementById("root");
    ReactDOM.render(App({
      setupComponent: GithubSetup,
    }), root);
  },
  initialState: {
    setupDone: !!Settings.get("setupDone"),
    opened: [],
    resolved: [],
    selectedTab: "opened",
  },
});

stateManager.render();

if (!!Settings.get("setupDone")) {
  setupGithub();
}

function setupGithub() {
  const github = new GithubConnector({
    owner: Settings.get("github.owner"),
    repoName: Settings.get("github.repo"),
    pullRequest: Settings.get("github.pr"),
  });

  github.getReviewComments().then(comments => {
    if (Settings.get("github.lastRevision") !== comments[0].revision) {
      Settings.set("github.lastRevision", comments[0].revision);
      Settings.set("github.resolved", "[]");
    }
    let resolved = Settings.get("github.resolved", [], true);
    stateManager.setState({
      opened: comments.filter(c => !resolved.includes(c.id)),
      resolved: comments.filter(c => resolved.includes(c.id)),
    });
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
