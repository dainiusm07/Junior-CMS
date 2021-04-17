import {
  protectComponent,
  protectComponentAny,
} from '../../../hoc/protectComponent';
import SideBarItem from '../SideBarItem/SideBarItem';
import { SideBarItemProps } from '../SideBarItem/SideBarItem.props';
import SideBarItemGroup from '../SideBarItemGroup/SideBarItemGroup';
import { SideBarItemGroupProps } from '../SideBarItemGroup/SideBarItemGroup.props';
import { SideBarContentData } from './SideBarContent.data';

export type ParsedSideBarItem = SideBarItemProps & {
  component: typeof SideBarItem;
};

export type ParsedSideBarContent = SideBarItemGroupProps & {
  component: typeof SideBarItemGroup;
  items: ParsedSideBarItem[];
};

const parseSideBarItems = (
  items: SideBarContentData['items'],
): ParsedSideBarItem[] =>
  items.map(({ permission, ...props }) => ({
    ...props,
    component: permission
      ? protectComponent(SideBarItem, permission)
      : SideBarItem,
  }));

export const parseSideBarContentData = (
  data: SideBarContentData[],
): ParsedSideBarContent[] => {
  return data.map(({ permissions, items, ...props }) => ({
    ...props,
    component: permissions
      ? protectComponentAny(SideBarItemGroup, permissions)
      : SideBarItemGroup,
    items: parseSideBarItems(items),
  }));
};
