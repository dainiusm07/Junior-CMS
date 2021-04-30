import reducer, { snackBarInitialState } from './Snackbar.reducers';
import {
  SnackbarActionType,
  SnackbarRemovedAction,
  SnackbarSetAction,
  SnackbarState,
} from './Snackbar.types';

const mockedSnackbarState: SnackbarState = {
  isOpen: true,
  type: 'success',
  message: 'Test message',
};

describe('Snackbar reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {} as never)).toBe(snackBarInitialState);
  });

  it(`should set snackbar on ${SnackbarActionType.SET} action`, () => {
    const action: SnackbarSetAction = {
      type: SnackbarActionType.SET,
      payload: mockedSnackbarState,
    };

    expect(reducer(undefined, action)).toBe(mockedSnackbarState);
  });

  it(`should set isOpen to false on ${SnackbarActionType.REMOVED} action`, () => {
    const action: SnackbarRemovedAction = {
      type: SnackbarActionType.REMOVED,
    };

    const expectedReturn: SnackbarState = {
      ...mockedSnackbarState,
      isOpen: false,
    };

    expect(reducer(mockedSnackbarState, action)).toStrictEqual(expectedReturn);
  });
});
