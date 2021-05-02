import axios from "axios";
import url from "./Urls";

export default function getNextLevel(params = {}) {
  let Url =
    url.domain + ":" + url.port + "/nextLevel/?id=" + params.id.toString();

  return axios
    .get(Url, {
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
