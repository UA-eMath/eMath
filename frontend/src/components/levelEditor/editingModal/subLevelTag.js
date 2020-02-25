import React from "react";
import {Tag} from "antd";


function SubLevelTag(props) {
	let {title} = props;


	switch (title) {
		//
		case "Definition":
			return <Tag color="green">Def.</Tag>;

		//
		case "Theorem":
			return <Tag color="red">Thm.</Tag>;

		case "Proposition":
			return <Tag color="volcano">Prop.</Tag>;

		case "Corollary":
			return <Tag color="orange">Corollary</Tag>;

		case "Lemma":
			return <Tag color="gold">Lemma</Tag>;

		//
		case "Notation":
			return <Tag color="blue">Note.</Tag>;

		case "Terminology":
			return <Tag color="cyan">Terml.</Tag>;

		//
		case "Convention":
			return <Tag color="blue">Convt.</Tag>;

		case "Comment":
			return <Tag color="blue">Cmt.</Tag>;

		case "Remark":
			return <Tag color="blue">Rmk.</Tag>;

		case "Example":
			return <Tag color="blue">Eg.</Tag>;

		default:
			return null
	}




	console.log(title);

	return <Tag color="red">red</Tag>
}

export default SubLevelTag