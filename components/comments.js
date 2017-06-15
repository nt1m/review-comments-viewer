"use strict";

function Comments({ comments }) {
  return createElement("div", {
    class: "comments",
  },
    ...comments.map(c => Comment({ comment: c }))
  );
}
