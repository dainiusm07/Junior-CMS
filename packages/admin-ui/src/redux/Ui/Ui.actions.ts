import {
  SideBarClosedAction,
  SideBarOpenedAction,
  UiActionTypes,
} from './Ui.types';

export const openSideBar = (): SideBarOpenedAction => ({
  type: UiActionTypes.sideBarOpened,
});

export const closeSideBar = (): SideBarClosedAction => ({
  type: UiActionTypes.sideBarClosed,
});
