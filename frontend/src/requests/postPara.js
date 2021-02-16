import axios from "axios";
import url from "./Urls";

export default function postPara(para) {
  return axios
    .post(url.domain + ":" + url.port + "/para/", para, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
