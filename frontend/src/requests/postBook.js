import axios from 'axios'
import url from './Urls'


export default function postBook(book) {
	return axios
		.post(url.domain + ':' + url.port+ "/book/",
			book,
			{
				 headers: {
                    "Content-Type": "application/json"
                },
			})
		.then(response => {
			return response;
		})
		.catch(error => console.log(error,book))
}