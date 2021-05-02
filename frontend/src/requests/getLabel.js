import axios from "axios";
import url from "./Urls";

export default function getLabel(params = {}) {
  if (params.labelID !== undefined) {
    return axios
      .get(
        url.domain + ":" + url.port + "/label/" + params.labelID.toString(),
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
      .catch((error) => console.log(error.response));
  } else if (params.levelID !== undefined) {
    return axios
      .get(
        url.domain + ":" + url.port + "/getLabel/?levelID=" + params.levelID,
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
      .catch((error) => console.log(error.response));
  } else if (params.paraID !== undefined) {
    return axios
      .get(url.domain + ":" + url.port + "/getLabel/?paraID=" + params.paraID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.response));
  } else if (params.rootID !== undefined) {
    return axios
      .get(url.domain + ":" + url.port + "/label/?rootID="+params.rootID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.response));
  } else {
    return axios
      .get(url.domain + ":" + url.port + "/label/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.response));
  }
}
