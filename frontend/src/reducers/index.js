import { combineReducers } from "redux";
import windows from "./windows";
import subordinates from "./subordinates";
import paras from "./paras";
import currentpage from "./currentPage";
import authentication from "./authenticate";

export default combineReducers({
  windows,
  subordinates,
  paras,
  currentpage,
  authentication,
});
