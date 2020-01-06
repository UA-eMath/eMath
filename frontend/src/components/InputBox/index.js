import React, {useState,useRef, useEffect} from "react";
import {Input, message, Button, Icon, Tooltip, Row, Col, Modal} from 'antd';


export default function InputBox(initValue,boxId,setContent) {
	const {TextArea} = Input;
	const inputEl = useRef(null);
	const [boxValue, setValue] = useState(initValue);

	return (
		<TextArea
			ref={inputEl}
			id={boxId}
			defaultValue={boxValue}
			style={{
				height: "100%",
			}}
			className="userInput"
			onChange={(e) => this.setContent(e, boxId)}
		/>
	);
}