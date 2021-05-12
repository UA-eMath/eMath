import axios from "axios";
import url from "./Urls";

export default function getToc(params = {}) {
  return axios
    .get(url.domain + ":" + url.port + "/getToc/?id=" + params.id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
}

export function getIndexTree(id, type) {
  //level id
  return axios
    .get(url.domain + ":" + url.port + "/indexItem/" + id + "?type=" + type, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
}

export function getIndexItems(id, type) {
  //para id
  return axios
    .get(
      url.domain +
        ":" +
        url.port +
        "/indexItem/" +
        id +
        "?type=" +
        type +
        "&byPara=true",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
}
