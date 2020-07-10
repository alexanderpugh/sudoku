import settingsReducer, { initialState } from './settingsReducer';

describe('settingsReducer', () => {
  it('Should return the default state if the action does not match the available actions', () => {
    expect(settingsReducer(initialState, 'FALSE')).toEqual(initialState);
  });
});
