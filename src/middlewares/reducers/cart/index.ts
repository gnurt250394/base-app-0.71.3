import { ActionPersist } from './../../actions/ActionData';
import actionTypes from 'middlewares/actions/actionTypes';
import { RoleType } from 'common/Constants';
export interface CartReducer {
    orderCount: number;
    adOrderCount: number;
}
const initialState: CartReducer = {
    orderCount: 0,
    adOrderCount: 0,
};

const cartReducer = (state = initialState, action: ActionPersist<CartReducer>) => {
    switch (action.type) {
        case actionTypes.ADD_COUNT_CART:
            console.log('action: ', action);
            return {
                ...state,
                orderCount: action.data?.orderCount,
                adOrderCount: action.data?.adOrderCount,
            };
        // case 'persist/REHYDRATE':
        //   console.log('action?.payload: ', action?.payload?.userProfile);
        //   if (action?.payload?.userProfile) {
        //     if (action?.payload?.userProfile?.user.loginToken) {
        //       return {
        //         ...state,
        //         ...action.payload.userProfile,
        //         isLogin: true,
        //       };
        //     }

        //     return {
        //       ...state,
        //       ...action.payload.userProfile,
        //     };
        //   }
        default:
            return state;
    }
};
export default cartReducer;
