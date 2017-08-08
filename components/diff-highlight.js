function DiffHighlight({ diff }) {
  const elements = diff.split("\n").map(line => {
    let className;
    switch (line[0]) {
      case " ":
        className = "line-unchanged";
        break;
      case "+":
        className = "line-added";
        break;
      case "-":
        className = "line-removed";
        break;
      default:
        className = "line-info";
        break;
    }
    return createElement("span", {
      className
    }, line);
  });
  return createElement("code", {
    className: "diff"
  }, elements);
}