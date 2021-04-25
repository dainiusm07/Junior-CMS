import { MenuItem } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useUserLogoutMutation } from './ProfileMenuContent.hooks';
import { ProfileMenuContentProps } from './ProfileMenuContent.props';

const ProfileMenuContent: React.FC<ProfileMenuContentProps> = ({
  closeProfileMenu,
}) => {
  const dispatch = useDispatch();
  const [logout] = useUserLogoutMutation(dispatch);
  const { t } = useTranslation();

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <>
      <NavLink to="/profile">
        <MenuItem onClick={closeProfileMenu}>{t('profile')}</MenuItem>
      </NavLink>
      <MenuItem onClick={handleLogoutClick}>{t('logout')}</MenuItem>
    </>
  );
};

export default ProfileMenuContent;
