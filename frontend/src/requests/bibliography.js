import axios from "axios";
import url from "./Urls";

const path = url.domain + ":" + url.port + "/bibliography/";

export const getBibliography = (params = {}) => {
  if (params.bbID !== undefined) {
    return axios
      .get(path + params.bbID.toString() + "/", {
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
      .get(path, {
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
};

export const postCitation = (citation) => {
  return axios
    .post(path, citation, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error, citation));
};

export const putCitation = (params = {}) => {
  return axios
    .put(
      path,
      {
        params: params,
      },
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
};

export const removeCitation = (params = {}) => {
  return axios
    .delete(path + params.bbID.toString() + "/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
