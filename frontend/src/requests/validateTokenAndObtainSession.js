import axios from "axios";
import url from "./Urls";

export default function validateTokenAndObtainSession({ data, idToken }) {
  let Url = url.domain + ":" + url.port + "/user-auth/";

  return axios
    .post(Url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
    })
    .then((response) => {
      return response;
    })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      } else {
        console.log("can not load data", thrown);
      }
    });
}
