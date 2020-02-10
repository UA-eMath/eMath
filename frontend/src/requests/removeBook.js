import axios from 'axios'
import url from './Urls'

export default function removeBook(id) {
	return axios
		.delete(url.domain + ':' + url.port+ "/book/" + id.toString() + "/",
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