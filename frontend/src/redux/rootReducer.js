import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { tourListReducer} from './reducers/tourReducer'

export const rootReducer = combineReducers({
  posts: postReducer,
  tourList: tourListReducer
})