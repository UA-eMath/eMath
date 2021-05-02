import axios from "axios";
import url from "./Urls";

export default function getNewCommand(bookId) {
  let Url = url.domain + ":" + url.port + "/newCommand/" + bookId;

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
