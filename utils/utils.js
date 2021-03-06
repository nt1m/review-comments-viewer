const { createElement } = React;
// function createElement(tagName, attributes, ...children) {
//   const element = document.createElement(tagName);
//   for (const attr in attributes) {
//     if (attr == "style" || attr == "css") {
//       element.style = attributes[attr];
//       continue;
//     }
//     if (attr == "content") {
//       element.innerHTML = attributes.content;
//       continue;
//     }
//     if (attr.startsWith("on")) {
//       element.addEventListener(attr.replace("on", "").toLowerCase(), attributes[attr]);
//       continue;
//     }
//     if (attr == "parent") {
//       attributes.parent.appendChild(element);
//       continue;
//     }
//     element.setAttribute(attr, attributes[attr]);
//   }
  
//   if (children) {
//     children.forEach(c => {
//       element.appendChild(c);
//     });
//   }

//   return element;
// }

function trimLines(str, max, keep) {
  if (!str) {
    return "";
  }
  let lines = str.split("\n");
  if (lines.length <= max) {
    return str;
  }
  if (keep == "last") {
    return lines.slice(lines.length - max, lines.length).join("\n");
  }
  return lines.slice(0, max).join("\n");
}

function getDiffLineNumber(diff) {
  const LINE_NUM_REGEX = /^@@ -\d+,\d+ \+(\d+),\d+ @@/ig;
  const matches = LINE_NUM_REGEX.exec(diff);
  if (!matches) {
    return console.error("Not a diff", diff);
  }

  return Number(matches[1]) + diff.split("\n").filter(line => !line.startsWith("-")).length;
}