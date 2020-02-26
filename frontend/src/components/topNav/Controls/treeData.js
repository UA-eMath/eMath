import getToc from "../../../requests/getTree";

export default function fetchTocTree(id, next) {
	getToc({id: id}).then(
		data => {
			if (!data || data.status !== 200) {
				console.error("FETCH_TOC_FAILED", data);
			} else {
				next(data.data.children)
			}
		}
	)
}
