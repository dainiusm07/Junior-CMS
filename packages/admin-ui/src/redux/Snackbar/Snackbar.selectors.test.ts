import { getMockedGlobalState } from '../store-data';
import { snackBarInitialState } from './Snackbar.reducers';
import {
  snackbarIsOpenSelector,
  snackbarMessageSelector,
  snackbarTypeSelector,
} from './Snackbar.selectors';
import { SnackbarState } from './Snackbar.types';

const mockSnackbar = (snackbarState: Partial<SnackbarState>) => ({
  ...snackBarInitialState,
  ...snackbarState,
});

const wrap = (dataSnackbar: SnackbarState) =>
  getMockedGlobalState({ dataSnackbar });

describe('Snackbar selectors', () => {
  describe('snackbarIsOpenSelector', () => {
    it('should return true when snackbar is open', () => {
      const state = wrap(mockSnackbar({ isOpen: true }));

      expect(snackbarIsOpenSelector(state)).toBe(true);
    });

    it('should return false when snackbar is not open', () => {
      const state = wrap(mockSnackbar({ isOpen: false }));

      expect(snackbarIsOpenSelector(state)).toBe(false);
    });
  });

  describe('snackbarTypeSelector', () => {
    it.each([['success' as const], ['error' as const]])(
      'should return snackbar %p type',
      (type) => {
        const state = wrap(mockSnackbar({ type }));

        expect(snackbarTypeSelector(state)).toBe(type);
      },
    );
  });

  describe('snackbarMessageSelector', () => {
    it('should return snackbar message', () => {
      const message = 'My message for selector';

      const state = wrap(mockSnackbar({ message }));

      expect(snackbarMessageSelector(state)).toBe(message);
    });
  });
});
