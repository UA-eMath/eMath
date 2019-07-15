import axios from 'axios'
import url from './Urls'


export default function getPage(params = {}) {
	let Url = url.domain + ':' + url.port+ "/content/?";

	if(params.id !== null){
		Url += 'id=' + params.id;
	}else if(params.page !== null){
		Url += 'page=' + params.page
	}

	return axios
		.get(Url,
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
