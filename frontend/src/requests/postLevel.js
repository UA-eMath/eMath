import axios from "axios";
import url from "./Urls";

export default function postLevel(level) {
  return axios
    .post(url.domain + ":" + url.port + "/Level/", level, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error, level));
}
