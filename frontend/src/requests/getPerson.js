import axios from "axios";
import url from "./Urls";

export default function getPerson(personID) {
  let id = personID ? personID.toString() : personID;
  let Url = url.domain + ":" + url.port + "/person/" + id;

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
