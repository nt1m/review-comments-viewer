"use strict";

class Comments {
  constructor(comments) {
    return createElement("div", {
      class: "comments",
    },
      ...comments.map(c => new Comment(c))
    );
  }
}