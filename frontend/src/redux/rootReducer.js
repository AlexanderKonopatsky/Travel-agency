import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { orderCreateReducer, orderDeatalisReducer, orderDeleteAdminReducer, orderListAdminReducer, orderListReducer } from "./reducers/orderReduces";
import { tourDetailsReducer, tourListReducer, tourCreateReducer, tourUpdateReducer, tourDeleteReducer, tourSearchReducer, listTourCategoriesReducer} from './reducers/tourReducer'
import { userDetailsReducer, userEditReducer, userListReducer, userSigninReducer, userUpdateProfileReducer } from "./reducers/userReducer";
import { userSignUpReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({
  tourList: tourListReducer,
  tourDetails: tourDetailsReducer,
  cart: cartReducer,
  userSignIn : userSigninReducer,
  userSignUp : userSignUpReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDeatalisReducer,
  orderList: orderListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
  tourCreate: tourCreateReducer,
  tourUpdate: tourUpdateReducer,
  tourDelete: tourDeleteReducer,
  orderListAdmin: orderListAdminReducer,
  orderDeleteAdmin: orderDeleteAdminReducer,
  listUser: userListReducer,
  updateUser: userEditReducer,
  tourSearch: tourSearchReducer,
  listTourCategory: listTourCategoriesReducer
})