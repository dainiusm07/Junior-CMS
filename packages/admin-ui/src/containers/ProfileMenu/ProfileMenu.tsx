import {
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { currentUserSelector } from '../../redux/User/User.selectors';
import useStyles from './ProfileMenu.styles';
import ProfileMenuContent from './ProfileMenuContent/ProfileMenuContent';

const ProfileMenu: React.FC = () => {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const user = useSelector(currentUserSelector);

  const handleOpen = () => {
    setOpen((isOpen) => !isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-haspopup="true"
        ref={anchorRef}
        onClick={handleOpen}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {user.email}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  <ProfileMenuContent closeProfileMenu={handleClose} />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ProfileMenu;
