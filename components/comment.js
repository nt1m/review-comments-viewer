"use strict";

function Comment({ comment }) {
  let isOpened = !!stateManager.getState().opened.find(c => c.id == comment.id);
  return createElement("div", {
    className: "comment",
  },
    createElement("div", {
      className: "comment-actions",
    },
      createElement("span", {
        className: "comment-filepath",
        onClick() {
          if (typeof port !== "undefined" && isOpened)
            port.sendMessage({ file: comment.file, lineNumber: comment.lineNumber });
        }
      }, comment.file + ":" + comment.lineNumber),
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
            Settings.set("github.resolved", stateManager.state.resolved.map(c => c.id));
          } else {
            stateManager.setState({ resolved: state.resolved.filter(c => c.id !== comment.id) });
            stateManager.state.opened.push(comment);
            Settings.set("github.resolved", stateManager.state.resolved.map(c => c.id));
          }
          e.stopPropagation();
        }
      }, isOpened ? "Resolve" : "Reopen")
    ),
    createElement("code", {
      className: "comment-diff",
    }, comment.diff),
    createElement("p", {
      className: "comment-body",
    }, comment.body)
  );
}