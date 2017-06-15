"use strict";

function Comment({ comment }) {
  return createElement("div", {
    className: "comment"
  },
    createElement("code", {
      className: "comment-diff",
    }, comment.diff),
    createElement("p", {
      className: "comment-body",
    }, comment.body),
    createElement("button", {
      content: "Resolve",
      className: "comment-resolve",
      onClick() {
        const state = stateManager.getState();
        stateManager.setState({ comments: state.comments.filter(c => c.id !== comment.id) })
      }
    }, "Resolve")
  );
}