import axios from 'axios'
import url from './Urls'

export default function getLinks(params = {}) {
	let Url = url.domain + ':' + url.port + '/Link/Internal/';

	if (params.id !== null) {
		Url += '?id=' + params.id;
	}

	return axios
		.get(Url,
			{
				headers: {
					'Content-type': "application/json"
				},
			})
		.then(response => {
			return response;
		})
		.catch(error => console.log(error))
}