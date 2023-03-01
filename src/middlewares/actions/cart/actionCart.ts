import {RoleType} from 'common/Constants';
import {RootReducer} from 'middlewares/reducers';
import {CartReducer} from 'middlewares/reducers/cart';
import actionTypes from '../actionTypes';
const _addCountCart = (data: CartReducer) => {
  return {
    type: actionTypes.ADD_COUNT_CART,
    data,
  };
};

export const onAddCountCart =
  (user: CartReducer) => async (dispatch: any, getState: any) => {
    dispatch(_addCountCart(user));
  };
export const onRemoveCountCart = () => async (dispatch: any, getState: any) => {
  dispatch(_addCountCart({orderCount: 0, adOrderCount: 0}));
};
export const onAddCartLocal =
  () => async (dispatch: any, getState: () => RootReducer) => {
    let state = getState();
    dispatch(
      _addCountCart({
        orderCount: state.cart.orderCount,
        adOrderCount: state.cart.adOrderCount + 1,
      }),
    );
  };
