/* eslint-disable consistent-return */
import produce from 'immer';
import { set, get, take } from 'lodash';

export const initialState = {
  initialData: {},
  modifiedData: {},
  routes: {},
  selectedAction: '',
  policies: [],
};

const reducer = (state, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case 'ON_CHANGE': {
        const keysLength = action.keys.length;
        const isChangingCheckbox = action.keys[keysLength - 1] === 'enabled';

        if (action.value && isChangingCheckbox) {
          const selectedAction = take(action.keys, keysLength - 1).join('.');
          draftState.selectedAction = selectedAction;
        }

        set(draftState, pathToValue, updatedValues);

        break;
      }
      case 'ON_RESET': {
        draftState.modifiedData = state.initialData;
        break;
      }
      case 'ON_SUBMIT_SUCCEEDED': {
        draftState.initialData = state.modifiedData;
        break;
      }

      case 'SELECT_ACTION': {
        const { actionToSelect } = action;
        draftState.selectedAction = actionToSelect === state.selectedAction ? '' : actionToSelect;
        break;
      }
      default:
        return draftState;
    }
  });

export default reducer;
