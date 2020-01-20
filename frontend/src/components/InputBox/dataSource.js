import emoji from "@jukben/emoji-search";
import React from "react";

const Item = ({entity: {name, char}}) => <div>{`${name}: ${char}`}</div>;
const dataSource = {
	"<": {
		dataProvider: token => [
			{name: "Bold", char: "<b></b>"},
			{name: "Italic", char: "<i></i>"},
			{name:"Caption",char:"<Caption></Caption>"},
			{name:"Inline Math",char:"<Math inline=\"true\"></Math>"},
			{name:"MathDisplay",char:"<Math></Math>"},
			{name:"Internal Link",char:"<iLink id=\"\"></iLink> "},
			{name:"Numbered List",char:"<ol>\n\t<li></li>\n</ol>"},
			{name:"Bulleted List",char:"<ul>\n\t<li></li>\n</ul>"},
			{name:"Table",char:"<table>\n\t<tr>\n\t<td></td>\n\t</tr>\n</table> "},
			{name:"Table Cell",char:"<td></td>>"},
			{name:"List Item",char:"<li></li>"},
			{name:"Table Row",char:"<tr></tr>>"},
		],
		component: Item,
		output: (item,trigger) => ({
            text: item.char,
            caretPosition:`${item.char} = <`.indexOf(">")+1
          })
	}
};

export default dataSource;