import axios from "axios";
import url from "./Urls";

export default function getLevel(levelID) {
  let Url = url.domain + ":" + url.port + "/Level/" + levelID.toString();

  return axios
    .get(Url, {
      headers: {
        "Content-Type": "application/json",
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
