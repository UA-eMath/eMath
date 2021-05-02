import axios from "axios";
import url from "./Urls";

export default function getLevel(levelID) {
  let id = levelID ? levelID.toString() : levelID;
  let Url = url.domain + ":" + url.port + "/Level/" + id;

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
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      } else {
        console.log("can not load data", thrown);
      }
    });
}
