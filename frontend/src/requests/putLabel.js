import axios from "axios";
import url from "./Urls";

export default function putLabel(params = {}) {
  console.log(params);
  return axios
    .put(
      url.domain + ":" + url.port + "/label/",
      {
        params: params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error.response));
}
