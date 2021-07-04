import axios from "axios";
import url from "./Urls";

export default function getUser(userID) {
  let id = userID ? userID.toString() : userID;
  let Url = url.domain + ":" + url.port + "/user/" + id;

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
