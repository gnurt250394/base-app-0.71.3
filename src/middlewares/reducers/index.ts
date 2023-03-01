import {combineReducers, createStore} from 'redux';
import loginReducer, {AuthReducer} from './auth/loginReducer';
import cartReducer, {CartReducer} from './cart';
import enumsReducer, {
  EnumsReducer,
} from 'middlewares/reducers/enums/enumsReducer';
export interface RootReducer {
  userProfile: AuthReducer;
  cart: CartReducer;
  enums: EnumsReducer;
}
const allReducer = combineReducers({
  userProfile: loginReducer,
  enums: enumsReducer,
  cart: cartReducer,
});
export default allReducer;
