import axios from "axios";
import url from "./Urls";

export default function getTexCommand(bookId) {
  let Url = url.domain + ":" + url.port + "/texCommand/" + bookId;

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
