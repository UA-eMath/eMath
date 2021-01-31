import axios from "axios";
import url from "./Urls";

export default function getLabel(id) {
  if (id !== undefined) {
    return axios
      .get(url.domain + ":" + url.port + "/label/" + id.toString(), {
        headers: {
          "Content-Type": "application/json",
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
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.response));
  }
}
