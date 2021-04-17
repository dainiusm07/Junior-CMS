import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Categories: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography color="textPrimary">{t('categories')}</Typography>
    </div>
  );
};

export default Categories;
