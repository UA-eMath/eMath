import axios from 'axios'
import url from 'url'

export default function updatePara(para, id) {
	return axios.patch(url.domain + url.port + "/para/?=" + id.toString() + '/',
		para,
		{
			headers: {
				"Content-Type": "application/json"
			},
		}).then(
		response => {
			return response;
		}).catch(error => {
		console.log(error)
	})
}