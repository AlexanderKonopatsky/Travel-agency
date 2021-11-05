import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { tourDetailsReducer, tourListReducer} from './reducers/tourReducer'
import { userSigninReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({
  tourList: tourListReducer,
  tourDetails: tourDetailsReducer,
  cart: cartReducer,
  userSignIn : userSigninReducer
})