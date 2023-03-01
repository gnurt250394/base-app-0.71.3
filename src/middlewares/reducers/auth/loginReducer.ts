import {ActionPersist} from './../../actions/ActionData';
import actionTypes from 'middlewares/actions/actionTypes';
import {RoleType} from 'common/Constants';
import {UserProfile} from 'res/type/Auth';
export interface UserLogin {
  username?: string;
  password?: string;
  isSave: boolean;
}
export interface AuthReducer {
  user?: UserProfile | null;
  isLogin: boolean;
  count: number;
  role: RoleType | '';
  loginToken: string;
  field: any;
  timeShowPopup?: number | null;
  userLogin: UserLogin;
}
const initialState: AuthReducer = {
  user: null,
  isLogin: false,
  loginToken: '',
  count: 0,
  role: '',
  field: null,
  timeShowPopup: new Date().getTime(),
  userLogin: {isSave: false},
};

const loginReducer = (
  state = initialState,
  action: ActionPersist<AuthReducer>,
) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: {...state.user, ...action.payload},
        loginToken: action.token,
        role: action.role,
        isLogin: true,
      };
    case actionTypes.SAVE_TIME_SHOW_POPUP:
      return {
        ...state,
        timeShowPopup: action.payload,
      };
    case actionTypes.SAVE_LOGIN:
      return {
        ...state,
        userLogin: {...state.userLogin, ...action.payload},
      };
    case actionTypes.SELECT_POSITION:
      return {
        ...state,
        position: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    case 'persist/REHYDRATE':
      if (action?.payload?.userProfile) {
        if (action?.payload?.userProfile?.isLogin) {
          return {
            ...state,
            ...action.payload.userProfile,
            isLogin: true,
          };
        }

        return {
          ...state,
          ...action.payload.userProfile,
        };
      }
    default:
      return state;
  }
};
export default loginReducer;
