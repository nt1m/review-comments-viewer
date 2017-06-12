"use strict";

class Comment {
  constructor(comment) {
    this.el = createElement("div", {
      class: "comment"
    },
      createElement("code", {
        class: "comment-diff",
        content: comment.diff,
      }),
      createElement("p", {
        class: "comment-body",
        content: comment.body,
      }),
      createElement("button", {
        content: "Resolve",
        class: "comment-resolve",
        onclick: this.removeComment.bind(this)
      })
    );
    return this.el;
  }

  removeComment() {
    this.el.remove();

  }
}