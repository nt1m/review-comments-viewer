"use strict";

const PAGE_REGEX = /<(.[^!<]+)>; rel="last"/g
class GithubConnector {
  /* Public API */
  constructor({ owner, repoName, pullRequest }) {
    this.requestURI = `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullRequest}/comments?per_page=1000`;
  }

  getReviewComments() {
    return this.getRawComments().then(comments => {
      let maxPRID = 0;
      comments.forEach(c => maxPRID = Math.max(c.pull_request_review_id, maxPRID));

      return comments
      .filter(c => c.diff_hunk && c.pull_request_review_id === maxPRID)
      .map(c => ({
        body: c.body,
        diff: trimLines(c.diff_hunk, 8, "last"),
        file: c.path,
        lineNumber: getDiffLineNumber(c.diff_hunk),
        id: this.getCommentID(c._links.self.href),
        revision: c.pull_request_review_id,
      }))
    });
  }

  /* Private, keep your hands off */ 
  getRawComments() {
    let responses = [];
    return fetch(this.requestURI).then(response => {
      let maxPageURL = response.headers.has("link") ?
        PAGE_REGEX.exec(response.headers.get("link"))[1] : null;
      let maxPage = maxPageURL ? Number(new URL(maxPageURL).searchParams.get("page")) : null;

      let promises = [
        response.json().then(json => responses = json),
      ];

      if (maxPage) {
        promises.concat(Array.from({length: maxPage - 1}, (v, k) => k+2)
          .map(i => fetch(this.requestURI + "&page=" + i)
            .then(r => r.json()
              .then((json) => responses = responses.concat(json))
            )
          )
        );
      }

      return Promise.all(promises).then(() => responses);
    });
  }

  getCommentID(url) {
    return url.substring(url.lastIndexOf("/") + 1, url.length);
  }
}
