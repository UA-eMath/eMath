import axios from 'axios'
import url from './Urls'

export default function getLinks(ids) {
	let Url = url.domain + ':' + url.port + "/Link/Internal/?id=" + ids;

		return new Promise(resolve => {
			axios.get(Url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${localStorage.getItem("token")}`,
				},
			})
				.then(function (response) {
					resolve(response.data);
				}).catch((error) => console.error(error));
		});
}