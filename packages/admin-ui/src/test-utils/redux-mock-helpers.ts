export const mockedDispatch = jest.fn();
export const mockedUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
  useSelector: mockedUseSelector,
}));
