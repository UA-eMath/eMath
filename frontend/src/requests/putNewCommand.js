import { message } from "antd";
import axios from "axios";
import url from "./Urls";

export default function putNewCommand(commands, bookId) {
  return axios
    .put(
      url.domain +
        ":" +
        url.port +
        "/newCommandUpdate/" + //uploadNewCommand
        bookId.toString() +
        "/",
      commands,
      {
        headers: {
          "Content-Type": "application/json", // application/json, multipart/form-data
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      message.success(response.data);
      return response;
    })
    .catch((error) => {
      message.error(error.response.data);
    });
}
