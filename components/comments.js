"use strict";

function Comments({ comments }) {
  let PRIds = new Map();
  for (let comment of comments) {
    if (!PRIds.has(comment.revision)) {
      PRIds.set(comment.revision, []);
    }
    let revComments = PRIds.get(comment.revision);
    revComments.push(comment)
  }

  return createElement("div", {
    className: "comments",
  },
    ...[...PRIds].map(group => createElement("div", {},
      User({
        name: group[1][0].user.login,
        avatar: group[1][0].user.avatar_url,
        time: group[1][0].time,
        review: group[1].length > 1
      }),
      createElement("ul", {

      }, ...group[1].map(c => Comment({comment: c})))
    ))
  );
}
