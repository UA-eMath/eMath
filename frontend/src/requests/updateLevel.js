import axios from 'axios'
import url from './Urls'

export default function updateLevel(level,id) {
	return axios
		.patch(url.domain + ':' + url.port+ "/Level/" + id.toString() + "/",
			level,
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