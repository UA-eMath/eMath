import axios from 'axios'
import url from './Urls'

export default function updateBook(book,id) {
	return axios
		.patch(url.domain + ':' + url.port+ "/book/" + id.toString() + "/",
			book,
			{
				 headers: {
                    "Content-Type": "application/json"
                },
			})
		.then(response => {
			return response;
		})
		.catch(error => {
			return error.response
		})
}