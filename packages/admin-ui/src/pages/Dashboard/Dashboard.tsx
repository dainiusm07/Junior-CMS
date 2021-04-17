import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography color="textPrimary">{t('dashboard')}</Typography>
    </div>
  );
};

export default Dashboard;
