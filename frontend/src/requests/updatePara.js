import axios from 'axios'
import url from './Urls'

export default function updatePara(para, id) {
	return axios.patch(url.domain + ":"+ url.port + "/para/" + id.toString() + '/',
		para,
		{
			headers: {
				"Content-Type": "application/json"
			},
		}).then(
		response => {
			console.log(response);
			return response;
		}).catch(error => {
		console.log(error.response)
	})
}