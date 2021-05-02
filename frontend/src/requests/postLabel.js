import axios from "axios";
import url from "./Urls";

export default function postLabel(label) {
  return axios
    .post(url.domain + ":" + url.port + "/label/", label, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error, label));
}
