import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Reports: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography color="textPrimary">{t('reports')}</Typography>
    </div>
  );
};

export default Reports;
