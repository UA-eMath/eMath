import axios from "axios";
import url from "./Urls";

export default function getTexShortcut(bookId) {
  let Url = url.domain + ":" + url.port + "/texShortcut/" + bookId;

  return axios
    .get(Url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error.response));
}
