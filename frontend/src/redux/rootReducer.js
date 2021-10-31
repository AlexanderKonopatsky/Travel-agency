import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { tourDetailsReducer, tourListReducer} from './reducers/tourReducer'

export const rootReducer = combineReducers({
  posts: postReducer,
  tourList: tourListReducer,
  tourDetails: tourDetailsReducer
})