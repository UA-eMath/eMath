import { combineReducers } from "redux";
import windows from "./windows";
import subordinates from "./subordinates";
import paras from "./paras";
import currentpage from "./currentPage";

export default combineReducers({
  windows,
  subordinates,
  paras,
  currentpage,
});
