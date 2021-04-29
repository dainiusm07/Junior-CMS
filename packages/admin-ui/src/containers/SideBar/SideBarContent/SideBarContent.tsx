import React from 'react';
import { useTranslation } from 'react-i18next';

import rawSideBarContentData from './SideBarContent.data';
import { SideBarContentProps } from './SideBarContent.props';
import useStyles from './SideBarContent.styles';
import {
  ParsedSideBarItem,
  parseSideBarContentData,
} from './SideBarContent.utils';

const sideBarContentData = parseSideBarContentData(rawSideBarContentData);

const SideBarContent: React.FC<SideBarContentProps> = ({ onItemClick }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderSideBarItems = (items: ParsedSideBarItem[]) =>
    items.map(({ component: SideBarItem, name, ...props }) => (
      <SideBarItem key={name} name={t(name)} {...props} onClick={onItemClick} />
    ));

  return (
    <div className={classes.root}>
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
