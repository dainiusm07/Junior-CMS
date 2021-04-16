import { SimpleAction } from '../types';

export type UiState = {
  sideBarOpen: boolean;
};

export enum UiActionTypes {
  sideBarOpened = 'ui/SIDEBAR_OPENED',
  sideBarClosed = 'ui/SIDEBAR_CLOSED',
}

export type SideBarOpenedAction = SimpleAction<UiActionTypes.sideBarOpened>;
export type SideBarClosedAction = SimpleAction<UiActionTypes.sideBarClosed>;

export type AllActions = SideBarOpenedAction | SideBarClosedAction;
