import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { orderCreateReducer, orderDeatalisReducer } from "./reducers/orderReduces";
import { tourDetailsReducer, tourListReducer} from './reducers/tourReducer'
import { userSigninReducer } from "./reducers/userReducer";
import { userSignUpReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({
  tourList: tourListReducer,
  tourDetails: tourDetailsReducer,
  cart: cartReducer,
  userSignIn : userSigninReducer,
  userSignUp : userSignUpReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDeatalisReducer
})