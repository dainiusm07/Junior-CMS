import { closeSideBar, openSideBar } from './Ui.actions';
import reducer, { initialState } from './Ui.reducers';

describe('Ui reducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {} as never);

    expect(state).toStrictEqual(initialState);
  });

  it.each([
    [true, openSideBar()],
    [false, closeSideBar()],
  ])('should set sideBarOpen to %s', (bool, action) => {
    const state = reducer({ ...initialState, sideBarOpen: !bool }, action);

    expect(state.sideBarOpen).toBe(bool);
  });
});
