import axios from 'axios'
import url from './Urls'

export default function removeIndexItem(id,type,path) {
	return axios
		.delete(url.domain + ':' + url.port+ "/indexItem/" + id.toString() + "/?type=" + type + "&path=" + path,
			{
				 headers: {
                    "Content-Type": "application/json"
                },
			})
		.then(response => {
			return response;
		})
		.catch(error => console.log(error))
}