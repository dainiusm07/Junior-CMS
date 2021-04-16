import { render } from '@testing-library/react';

import { mockedUseSelector } from '../../redux/redux-mock-helpers';
import {
  mockMatchMedia,
  resetMatchMedia,
} from '../../test-utils/mock-match-media';
import theme from '../../theme';
import SideBar from './SideBar';

const mobileWidth = theme.breakpoints.values.xs - 1;
const desktopWidth = theme.breakpoints.values.xs;

describe('SideBar component', () => {
  afterEach(() => {
    resetMatchMedia();
  });

  [
    {
      description:
        'should match snapshot when in desktop view and SideBar is opened',
      width: desktopWidth,
      isOpened: true,
    },
    {
      description:
        'should match snapshot when in desktop view and SideBar is closed',
      width: desktopWidth,
      isOpened: false,
    },
    {
      description:
        'should match snapshot when in mobile view and SideBar is opened',
      width: mobileWidth,
      isOpened: true,
    },
    {
      description:
        'should match snapshot when in mobile view and SideBar is closed',
      width: mobileWidth,
      isOpened: false,
    },
  ].forEach(({ description, width, isOpened }) => {
    it(`${description}`, () => {
      mockMatchMedia(width);
      mockedUseSelector.mockReturnValueOnce(isOpened);
      const { asFragment } = render(<SideBar />, {});

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
