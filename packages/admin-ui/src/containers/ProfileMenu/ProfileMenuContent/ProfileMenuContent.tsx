import { MenuItem } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useUserLogoutMutation } from './ProfileMenuContent.hooks';
import { ProfileMenuContentProps } from './ProfileMenuContent.props';

const ProfileMenuContent: React.FC<ProfileMenuContentProps> = ({
  closeProfileMenu,
}) => {
  const dispatch = useDispatch();
  const [logout] = useUserLogoutMutation(dispatch);

  const handleLogoutClick = async () => {
    await logout();
    closeProfileMenu();
  };

  return (
    <>
      <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </>
  );
};

export default ProfileMenuContent;
