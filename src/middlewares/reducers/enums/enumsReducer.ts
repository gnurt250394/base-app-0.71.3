import {ActionPersist} from './../../actions/ActionData';
import actionTypes from 'middlewares/actions/actionTypes';
import {Enums} from 'res/type/Enums';

export interface EnumsReducer {
  enums?: Enums;
}
const initialState: EnumsReducer = {
  enums: undefined,
};

const enumsReducer = (
  state = initialState,
  action: ActionPersist<EnumsReducer>,
) => {
  switch (action.type) {
    case actionTypes.SAVE_ENUMS:
      return {
        ...state,
        enums: action.payload,
      };
    default:
      return state;
  }
};
export default enumsReducer;
