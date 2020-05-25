import React, {useState,useEffect} from 'react'
import 'antd/dist/antd.css';
import TopNav from './../../components/topNav';
import {Layout} from "antd";
import BookSetting from "../bookSetting";
import {Tabs} from 'antd'
import GetRoots from "../../requests/GetRoots";
const {TabPane} = Tabs;


export default function SetupPage(props) {
	const {Content} = Layout;

	const rootId = props.match.params.id;
	const [book,setBook] = useState({});

	useEffect(() => {
		fetchRoot()
	}, []);

	const fetchRoot = () => {
		GetRoots({rootId}).then(
			data => {
				if (!data || data.status !== 200) {
					console.error("FETCH_TAGS_FAILED", data);
				} else {
					setBook(data.data);
				}
			}
		)
	};

	return (

		<Layout>
			<TopNav/>
			<Content>
				<Tabs
					defaultActiveKey="1"
					tabPosition={"left"}
				>
					<TabPane tab={"Book information"}
					         key={1}
					>
						<BookSetting book={book}/>
					</TabPane>
					<TabPane tab={"Content completion"} key={2}>
						Content completion
					</TabPane>
					<TabPane tab={"Tex shortcut "} key={3}>
						Tex shortcut
					</TabPane>
				</Tabs>
			</Content>
		</Layout>
	)
}