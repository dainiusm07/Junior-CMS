import React from 'react';

import { Permission } from '../../../generated/gql-types';
import * as ProtectComponentHOC from '../../../hoc/protectComponent';
import SideBarItem from '../SideBarItem/SideBarItem';
import SideBarItemGroup from '../SideBarItemGroup/SideBarItemGroup';
import { SideBarContentData } from './SideBarContent.data';
import { parseSideBarContentData } from './SideBarContent.utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const protectedComponentValue: React.FC = (() => {}) as never;
// eslint-disable-next-line @typescript-eslint/no-empty-function
const protectedComponentValueAny: React.FC = (() => {}) as never;

type SideBarContentItem = SideBarContentData['items'][number];

const item: SideBarContentItem = {
  name: 'item1',
  match: new RegExp('.'),
  redirectTo: '/item1',
};

const itemProtected: SideBarContentItem = {
  name: 'item2',
  permission: Permission.ReadProduct,
  match: new RegExp('.'),
  redirectTo: '/item2',
};

const getGroup = (
  items: SideBarContentItem[],
  groupPermissions?: Permission[],
): SideBarContentData => ({
  name: 'group1',
  permissions: groupPermissions,
  items,
});

describe('SideBarContent utils', () => {
  describe('parseSideBarContentData', () => {
    let protectComponent: jest.SpyInstance;
    let protectComponentAny: jest.SpyInstance;

    beforeEach(() => {
      protectComponent = jest
        .spyOn(ProtectComponentHOC, 'protectComponent')
        .mockReturnValue(protectedComponentValue);
      protectComponentAny = jest
        .spyOn(ProtectComponentHOC, 'protectComponentAny')
        .mockReturnValue(protectedComponentValueAny);
    });

    it('should return array of groups', () => {
      const groups = [getGroup([]), getGroup([])];
      const parsedData = parseSideBarContentData(groups);

      expect(parsedData.length).toBe(groups.length);
    });

    it('should return protected group component', () => {
      const group = getGroup([], [Permission.ReadProduct]);
      const parsedGroup = parseSideBarContentData([group])[0];

      expect(protectComponentAny).toBeCalledTimes(1);
      expect(parsedGroup.component).toBe(protectedComponentValueAny);
    });

    it('should return non-protected group component', () => {
      const group = getGroup([]);
      const parsedGroup = parseSideBarContentData([group])[0];

      expect(protectComponentAny).toBeCalledTimes(0);
      expect(parsedGroup.component).toBe(SideBarItemGroup);
    });

    it('should return group with protected item component', () => {
      const group = getGroup([itemProtected]);
      const parsedGroup = parseSideBarContentData([group])[0];

      expect(protectComponent).toBeCalledTimes(1);
      expect(parsedGroup.items[0].component).toBe(protectedComponentValue);
    });

    it('should return group with non-protected item component', () => {
      const group = getGroup([item]);
      const parsedGroup = parseSideBarContentData([group])[0];

      expect(protectComponent).toBeCalledTimes(0);
      expect(parsedGroup.items[0].component).toBe(SideBarItem);
    });
  });
});
