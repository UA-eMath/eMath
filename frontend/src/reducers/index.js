import { combineReducers } from "redux";
import windows from "./windows";
import subordinates from "./subordinates";
import paras from "./paras";
import currentpage from "./currentPage";
import authentication from "./authenticate";
import uploadingQueue from "./uploadQueue";
import page from "./page";

export default combineReducers({
  windows,
  subordinates,
  paras,
  currentpage,
  authentication,
  uploadingQueue,
  page,
});
