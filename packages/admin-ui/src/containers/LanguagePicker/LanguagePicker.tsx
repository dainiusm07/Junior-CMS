import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import React, { useRef, useState } from 'react';

import useStyles from './LanguagePicker.styles';
import LanguagePickerContent from './LanguagePickerContent/LanguagePickerContent';

const LanguagePicker: React.FC = () => {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((isOpen) => !isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        className={classes.button}
        aria-haspopup="true"
        ref={anchorRef}
        onClick={handleOpen}
      >
        <LanguageIcon className={classes.icon} />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'center top',
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  dense
                  className={classes.menuList}
                  autoFocusItem={open}
                >
                  <LanguagePickerContent />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default LanguagePicker;
