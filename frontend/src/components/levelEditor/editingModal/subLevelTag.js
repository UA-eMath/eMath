import React from "react";
import {Tag} from "antd";


function SubLevelTag(props) {
	let {title} = props;


	switch (title) {
		//
		case "Definition":
			return <Tag color="green">Def</Tag>;

		//
		case "Theorem":
			return <Tag color="red">Thm</Tag>;

		case "Proposition":
			return <Tag color="volcano">Prop</Tag>;

		case "Corollary":
			return <Tag color="orange">Corollary</Tag>;

		case "Lemma":
			return <Tag color="gold">Lemma</Tag>;

		//
		case "Notation":
			return <Tag color="blue">Notation</Tag>;

		case "Terminology":
			return <Tag color="cyan">Terminology</Tag>;

		//
		case "Convention":
			return <Tag color="blue">Convention</Tag>;

		case "Comment":
			return <Tag color="blue">Comment</Tag>;

		case "Remark":
			return <Tag color="blue">Remark</Tag>;

		//
		case "Example":
			return <Tag color="blue">Example</Tag>;

		case "Exercise":
			return <Tag color="blue">Exercise</Tag>;

		default:
			return null
	}
}

export default SubLevelTag