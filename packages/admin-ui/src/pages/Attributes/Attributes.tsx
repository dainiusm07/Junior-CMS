import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Attributes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography color="textPrimary">{t('attributes')}</Typography>
    </div>
  );
};

export default Attributes;
