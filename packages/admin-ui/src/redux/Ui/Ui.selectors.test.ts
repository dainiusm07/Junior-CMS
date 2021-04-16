import { getMockedGlobalState } from '../store-data';
import { initialState } from './Ui.reducers';
import { sideBarOpenedSelector } from './Ui.selectors';
import { UiState } from './Ui.types';

const wrap = (uiState?: UiState) => getMockedGlobalState({ dataUi: uiState });

describe('Ui selectors', () => {
  describe('sideBarOpenedSelector', () => {
    [true, false].forEach((opened) => {
      it(`should return ${opened} when sidebar is ${
        opened ? 'opened' : 'closed'
      }`, () => {
        const nextState = wrap({ ...initialState, sideBarOpen: opened });

        expect(sideBarOpenedSelector(nextState)).toBe(opened);
      });
    });
  });
});
