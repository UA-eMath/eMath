import axios from 'axios'
import url from './Urls'

export default function removePara(id) {
	return axios
		.delete(url.domain + ':' + url.port+ "/para/" + id.toString() + "/",
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