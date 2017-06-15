"use strict";

function Comment({ comment }) {
  let isOpened = !!stateManager.getState().opened.find(c => c.id == comment.id);
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
      className: isOpened ? "comment-resolve" : "comment-reopen",
      onClick() {
        const state = stateManager.getState();
        if (isOpened) {
          stateManager.setState({ opened: state.opened.filter(c => c.id !== comment.id) });
          stateManager.state.resolved.push(comment);
        } else {
          stateManager.setState({ resolved: state.resolved.filter(c => c.id !== comment.id) });
          stateManager.state.opened.push(comment);
        }
      }
    }, isOpened ? "Resolve" : "Reopen")
  );
}