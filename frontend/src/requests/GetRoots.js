import axios from 'axios'
import url from './Urls'


export default function GetRoots(params = {}) {
	return axios
		.get(url.domain + ':' + url.port + '/root/',
			{
				 headers: {
                    "Content-Type": "application/json"
                },
			})
		.then(response => {
			return response;
		})
		.catch(error => console.log(error.response))
}
