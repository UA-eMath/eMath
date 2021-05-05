import axios from "axios";
import url from "./Urls";

export default function updateBook(book, id = "") {
  let URL;
  if (id !== "") {
    URL = url.domain + ":" + url.port + "/book/" + id.toString() + "/";
  } else {
    URL = url.domain + ":" + url.port + "/book/";
  }

  return axios
    .patch(URL, book, {
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
