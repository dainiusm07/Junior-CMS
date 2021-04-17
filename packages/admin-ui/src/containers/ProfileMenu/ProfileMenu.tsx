import {
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuList,
  Paper,
  Popper,
  useMediaQuery,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PersonIcon from '@material-ui/icons/Person';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { currentUserSelector } from '../../redux/User/User.selectors';
import theme from '../../theme';
import useStyles from './ProfileMenu.styles';
import ProfileMenuContent from './ProfileMenuContent/ProfileMenuContent';

const ProfileMenu: React.FC = () => {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const user = useSelector(currentUserSelector);
  const isXs = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const handleOpen = () => {
    setOpen((isOpen) => !isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {isXs ? (
        <IconButton
          size="medium"
          className={classes.iconButton}
          aria-haspopup="true"
          ref={anchorRef}
          onClick={handleOpen}
        >
          <PersonIcon fontSize="inherit" />
        </IconButton>
      ) : (
        <Button
          aria-haspopup="true"
          ref={anchorRef}
          onClick={handleOpen}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {user.email}
        </Button>
      )}

      <Popper
        open={open}
        placement={isXs ? 'bottom-end' : undefined}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: isXs ? 'right top' : 'center top',
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
