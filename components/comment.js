"use strict";

function Comment({ comment }) {
  let isOpened = !!stateManager.getState().opened.find(c => c.id == comment.id);
  return createElement("div", {
    className: "comment",
  },
    createElement("code", {
      className: "comment-diff",
    }, comment.diff),
    createElement("div", {
      className: "comment-contents",
    },
      createElement("p", {
        className: "comment-body",
      }, comment.body),
      (typeof port !== "undefined" && isOpened) && createElement("button", {
        className: "comment-view-file",
        onClick() {
          port.sendMessage({ file: comment.file, lineNumber: comment.lineNumber });
        }
      }, "View file"),
      createElement("button", {
        className: isOpened ? "comment-resolve" : "comment-reopen",
        onClick(e) {
          const state = stateManager.getState();
          if (isOpened) {
            stateManager.setState({ opened: state.opened.filter(c => c.id !== comment.id) });
            stateManager.state.resolved.push(comment);
          } else {
            stateManager.setState({ resolved: state.resolved.filter(c => c.id !== comment.id) });
            stateManager.state.opened.push(comment);
          }
          e.stopPropagation();
        }
      }, isOpened ? "Resolve" : "Reopen")
    )
  );
}