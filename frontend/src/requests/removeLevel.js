import axios from 'axios'
import url from './Urls'

export default function removeLevel(id) {
	return axios
		.delete(url.domain + ':' + url.port+ "/Level/" + id.toString() + "/",
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