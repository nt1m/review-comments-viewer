let github = new GithubConnector({
  owner: "JanitorTechnology",
  repoName: "janitor",
  pullRequest: 76,
});

github.getReviewComments().then(comments => {
  let root = document.getElementById("root");
  root.appendChild(new Comments(comments));
});
