import { LanguageCode } from '@junior-cms/common';
import { MenuItem } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import { LOCAL_STORAGE_LANG } from '../../../common/constants';
import i18n from '../../../i18n';
import useStyles from './LanguagePickerContent.styles';

type LanguageSelection = {
  lang: LanguageCode;
  src: string;
};

const languageSelections: LanguageSelection[] = [
  {
    lang: LanguageCode.EN,
    src: '/flags/en.png',
  },
  {
    lang: LanguageCode.LT,
    src: '/flags/lt.png',
  },
];

const LanguagePickerContent: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleLanguageClick = (lang: LanguageCode) => {
    return () => {
      localStorage.setItem(LOCAL_STORAGE_LANG, lang);
      history.go(0);
    };
  };

  return (
    <>
      {languageSelections.map(({ src, lang }) => (
        <MenuItem
          key={lang}
          className={classes.listItem}
          disabled={lang === i18n.language}
          onClick={handleLanguageClick(lang)}
        >
          <img className={classes.flag} src={src} alt="Flag" />
        </MenuItem>
      ))}
    </>
  );
};

export default LanguagePickerContent;
