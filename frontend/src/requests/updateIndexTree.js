import axios from "axios";
import url from "./Urls";

export default function updateBook(indexItem, id) {
  let URL = url.domain + ":" + url.port + "/indexItem/" + id.toString() + "/";

  return axios
    .patch(URL, indexItem, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
