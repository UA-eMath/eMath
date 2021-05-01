import React from "react";

const Item = ({ entity: { name, char } }) => <div>{`${name}: ${char}`}</div>;

const tagArray = [
  { name: "Bold", char: "<b></b>" },
  { name: "Italic", char: "<i></i>" },
  { name: "Caption", char: "<Caption></Caption>" },
  { name: "MathInline", char: "<math></math>" },
  { name: "MathDisplay", char: "<Math></Math>" },
  { name: "Internal Link", char: '<iLink id=""></iLink> ' },
  { name: "Numbered List", char: "<ol>\n\t<li></li>\n</ol>" },
  { name: "Bulleted List", char: "<ul>\n\t<li></li>\n</ul>" },
  { name: "Table", char: "<table>\n\t<tr>\n\t<td></td>\n\t</tr>\n</table> " },
  { name: "Table Cell", char: "<td></td>" },
  { name: "List Item", char: "<li></li>" },
  { name: "Table Row", char: "<tr></tr>" },
];

export const texCommandArray = []; //{ name: "\Sum", char: "#1 + #2" }

const dataSource = [
  {
    value: "math",
    caption: "math",
    meta: "Math Inline",
    score: 1000,
  },
  {
    value: "Math",
    caption: "Math",
    meta: "Math Display",
    score: 1000,
  },
  {
    value: "iLink id=''",
    caption: "iLink",
    meta: "Internal Link",
    score: 1000,
  },
  {
    value: "<table>\n\t<tr>\n\t<td></td>\n\t</tr>\n</table>",
    caption: "table",
    meta: "Table",
    score: 1000,
  },
  {
    value: "Caption",
    caption: "Caption",
    meta: "Caption",
    score: 1000,
  },
];
// const dataSource = {
//   // autocomplete tags
//   "<": {
//     dataProvider: (token) =>
//       tagArray
//         .filter((item) => {
//           return item.char.toLowerCase().includes(token.toLowerCase());
//         })
//         .slice(0, 10)
//         .map(({ name, char }) => ({ name, char })),
//     component: Item,
//     output: (item, trigger) => ({
//       text: item.char,
//       caretPosition: "next",
//     }),
//   },
//   // autocomplete tex commands
//   "\\": {
//     dataProvider: (token) =>
//       texCommandArray
//         .filter((item) => {
//           return (
//             item.name.toLowerCase().includes(token.toLowerCase()) ||
//             item.char.toLowerCase().includes(token.toLowerCase())
//           );
//         })
//         .slice(0, 10)
//         .map(({ name, char }) => ({ name, char })),
//     component: Item,
//     output: (item, trigger) => ({
//       text: item.name,
//       caretPosition: "next",
//     }),
//   },
// };

export default dataSource;
