import {combineReducers} from 'redux'
import windows from './windows'
import subordinates from './subordinates'
import paras from "./paras";

export default combineReducers({
	windows,
	subordinates,
	paras,
})