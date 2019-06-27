import {combineReducers} from 'redux'
import windows from './windows'
import subordinates from './subordinates'


export default combineReducers({
	windows,
	subordinates,
})