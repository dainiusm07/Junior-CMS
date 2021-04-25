import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import InformationIndicator from '../../components/InformationIndicator/InformationIndicator';
import MainContent from '../../components/MainContent/MainContent';
import { currentUserSelector } from '../../redux/User/User.selectors';
import useStyles from './Profile.styles';
import ProfileUpdateForm from './ProfileUpdateForm/ProfileUpdateForm';

const Profile: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const user = useSelector(currentUserSelector);

  const additionalProfileInfo = {
    [t('id')]: user.id,
    [t('role')]: user.role.name,
    [t('updated-at')]: new Date(user.updatedAt).toLocaleString(),
    [t('created-at')]: new Date(user.createdAt).toLocaleString(),
  };

  return (
    <MainContent>
      <div className={classes.horizontalPadding}>
        <div>
          <InformationIndicator info={additionalProfileInfo} />
        </div>
        <ProfileUpdateForm className={classes.formContainer} user={user} />
      </div>
    </MainContent>
  );
};

export default Profile;
