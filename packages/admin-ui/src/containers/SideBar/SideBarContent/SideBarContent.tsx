import React from 'react';
import { useDispatch } from 'react-redux';

import { closeSideBar } from '../../../redux/Ui/Ui.actions';
import rawSideBarContentData from './SideBarContent.data';
import {
  ParsedSideBarItem,
  parseSideBarContentData,
} from './SideBarContent.utils';

const sideBarContentData = parseSideBarContentData(rawSideBarContentData);

const SideBarContent: React.FC = () => {
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    dispatch(closeSideBar());
  };

  const renderSideBarItems = (items: ParsedSideBarItem[]) =>
    items.map(({ component: SideBarItem, name, ...props }) => (
      <SideBarItem
        key={name}
        name={name}
        {...props}
        onClick={handleLinkClick}
      />
    ));

  return (
    <div>
      {sideBarContentData.map(
        ({ component: SideBarItemGroup, name, items }) => {
          return (
            <SideBarItemGroup key={name} name={name}>
              {renderSideBarItems(items)}
            </SideBarItemGroup>
          );
        },
      )}
    </div>
  );
};

export default SideBarContent;
