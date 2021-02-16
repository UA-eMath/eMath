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
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.response));
  } else if (params.levelID !== undefined || params.paraID !== undefined) {
    return axios
      .get(
        url.domain + ":" + url.port + "/getLabel/",
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
  } else if (params.content !== undefined) {
    return axios
      .get(
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
  } else if (params.rootID !== undefined) {
    return axios
      .get(
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
  } else {
    return axios
      .get(url.domain + ":" + url.port + "/label/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.response));
  }
}
