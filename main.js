let github = new GithubConnector({
  owner: "JanitorTechnology",
  repoName: "janitor",
  pullRequest: 79,
});

const stateManager = new StateManager({
  renderer(state) {
    let root = document.getElementById("root");
    ReactDOM.render(Tabs({
      selectedTab: state.selectedTab,
      tabs: [{
        id: "opened",
        label: "Opened",
        component: Comments({ comments: state.opened }),
      }, {
        id: "resolved",
        label: "Resolved",
        component: Comments({ comments: state.resolved }),
      }]
    }), root);
  },
  initialState: {
    opened: [],
    resolved: [],
    selectedTab: "opened",
  },
});

github.getReviewComments().then(comments => {
  console.log(comments);
  stateManager.setState({ opened: comments });
});

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
