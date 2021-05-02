import axios from "axios";
import url from "./Urls";

export default function getRoots(params = {}) {
  const { rootId } = params;
  const root = rootId ? "/root/" + rootId : "/root/";

  return axios
    .get(url.domain + ":" + url.port + root, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error.response));
}
