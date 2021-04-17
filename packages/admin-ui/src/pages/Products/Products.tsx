import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Products: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography color="textPrimary">{t('products')}</Typography>
    </div>
  );
};

export default Products;
