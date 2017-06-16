"use strict";

function Comments({ comments }) {
  return createElement("div", {
    className: "comments",
  },
    ...comments.map(c => Comment({ comment: c }))
  );
}
