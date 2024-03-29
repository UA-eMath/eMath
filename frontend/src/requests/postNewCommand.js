import { message } from "antd";
import axios from "axios";
import url from "./Urls";

export default function postNewCommand(file, bookId) {
  return axios
    .post(
      url.domain +
        ":" +
        url.port +
        "/uploadNewCommand/" +
        bookId.toString() +
        "/",
      file,
      {
        headers: {
          "Content-Disposition": "attachment; filename=" + file.name,
          "Content-Type": "*/*", // application/json, multipart/form-data
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
