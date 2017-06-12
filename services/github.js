"use strict";

class GithubConnector {
  /* Public API */
  constructor({ owner, repoName, pullRequest }) {
    this.requestURI = `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullRequest}/comments`;
  }

  getReviewComments() {
    return this.getRawComments().then(comments => {
      return comments.map(c => ({
        body: c.body,
        diff: c.diff_hunk,
        lineNumber: null,
        id: this.getCommentID(c._links.self.href),
      }))
    });
  }

  /* Private, keep your hands off */ 
  getRawComments() {
    return fetch(this.requestURI)
      .then(response => response.json());
  }

  getCommentID(url) {
    return url.substring(url.lastIndexOf("/") + 1, url.length);
  }
}