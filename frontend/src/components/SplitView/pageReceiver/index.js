import getPage from '../../../requests/getPage'

export default function fetchPage(id,page,next) {
	getPage({id:id,page:page}).then(
		data => {
			if (!data || data.status !== 200) {
				console.error("FETCH_TAGS_FAILED", data);
			}
			else {
				next(data.data)
			}
		}
	)

}