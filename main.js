let github = new GithubConnector({
  owner: "JanitorTechnology",
  repoName: "janitor",
  pullRequest: 76,
});

const stateManager = new StateManager({
  renderer(state) {
    let root = document.getElementById("root");
    ReactDOM.render(new Comments({ comments: state.comments }), root);
  },
  initialState: {
    projects: [],
  },
});

github.getReviewComments().then(comments => {
  stateManager.setState({ comments });
});
