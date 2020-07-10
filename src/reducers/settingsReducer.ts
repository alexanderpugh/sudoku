import { SettingsState } from 'sudokuApp/types/settings-state.interface';
import { Action } from 'sudokuApp/types/action.interface';

export const initialState: SettingsState = {
  validate_onchange: false,
};

export default function settingsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'EDIT_SETTING':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
}
