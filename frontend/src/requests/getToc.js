import axios from 'axios'
import url from './Urls'


export default function GetToc(params = {}) {

	return axios
		.get(url.domain + ':' + url.port+ "/getToc/?id=" + params.id,
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
