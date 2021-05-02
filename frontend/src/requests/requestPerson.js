import axios from "axios";
import url from "./Urls";

export function getUsermod(params = {}) {
  const URL = `${url.domain}:${url.port}/usermod/${params.username}/`;

  return axios
    .get(URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function authPerson(params = {}) {
  const URL = `${url.domain}:${url.port}/api-token-auth/`;

  return axios
    .post(URL, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function postPerson(params = {}) {
  return axios
    .post(url.domain + ":" + url.port + "/person/", params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updatePerson(params = {}) {
  const URL = url.domain + ":" + url.port + "/person/" + params.id.toString();

  return axios
    .put(URL, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
