import axios from 'axios'
import url from './Urls'

export default function GetToc(params = {}) {

	return axios
		.get(url.domain + ':' + url.port + "/getToc/?id=" + params.id,
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

export function getIndexTree(id, type) {
	return axios
		.get(url.domain + ':' + url.port + "/indexItem/" + id + "?type=" + type,
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

export function getIndexItem(id,type) {
	return axios
		.get(url.domain + ':' + url.port + "/indexItem/" + id + "?type=" + type + "&single=true",
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