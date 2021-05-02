import axios from "axios";
import url from "./Urls";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default function getPage(params = {}) {
  let Url = url.domain + ":" + url.port + "/content/";

  return axios
    .get(Url, {
      cancelToken: source.token,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      params,
    })
    .then((response) => {
      return response;
    })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      } else {
        console.log("can not load data", thrown);
      }
    });
}
