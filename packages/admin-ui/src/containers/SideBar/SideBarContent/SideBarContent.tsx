import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleLinkClick = () => {
    dispatch(closeSideBar());
  };

  const renderSideBarItems = (items: ParsedSideBarItem[]) =>
    items.map(({ component: SideBarItem, name, ...props }) => (
      <SideBarItem
        key={name}
        name={t(name)}
        {...props}
        onClick={handleLinkClick}
      />
    ));

  return (
    <div>
      {sideBarContentData.map(
        ({ component: SideBarItemGroup, name, items }) => {
          return (
            <SideBarItemGroup key={name} name={t(name)}>
              {renderSideBarItems(items)}
            </SideBarItemGroup>
          );
        },
      )}
    </div>
  );
};

export default SideBarContent;
