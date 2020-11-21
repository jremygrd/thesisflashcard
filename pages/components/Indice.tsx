import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export default function PositionedPopper(indice:any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const classes = useStyles();

  const handleClick = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };


  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div className={classes.root}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>{indice.children}</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

        {/* <Button onClick={handleClick('left')}>left</Button> */}
        <IconButton aria-label="grid" onClick={handleClick('left')}>
                <EmojiObjectsIcon fontSize="small"/>
        </IconButton>
    </div>
    </ClickAwayListener>
  );
}