import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container, AppBar, Toolbar, Typography, Avatar, Grid, Divider,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { PIC_ENDOINT } from '../../connector';
import Inventory from '../inventory';
import ManageItem from '../manageItem';
import CreateItem from '../createitem/createItem';

const defaultPicUrl = 'default_group_pic.png';

const useStyles = makeStyles((theme) => ({
  animatedGrid: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: '400ms',
    }),
    flexGrow: 1,
  },
  manageItem: ({ hassecondpane }) => {
    if (!hassecondpane) {
      return { maxWidth: '0px !important', overflow: 'hidden', opacity: 0 };
    } return {};
  },
}));

export default function LoggedInPage() {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const session = useSelector((state) => state.session);
  const selectedPaneType = useSelector((state) => state.selectedPane.type);
  const classes = useStyles({ hassecondpane: !!selectedPaneType });
  let avatar;

  if (user.picurl === defaultPicUrl) {
    avatar = <Avatar edge="start" alt={user.username} src={PIC_ENDOINT(group.picurl)} />;
  } else {
    avatar = <Avatar edge="start">{user.username.charAt(0).toUpperCase()}</Avatar>;
  }

  function choseSecondPane() {
    console.log(selectedPaneType)
    switch (selectedPaneType) {
      case 'ITEM_MANAGE':
        return <ManageItem />;
      case 'ITEM_INSERT':
        return <CreateItem />;
      default:
        return '';
    }
  }

  return (
    <Container maxWidth={false} style={{ paddingTop: '5em', height: '100%' }}>
      <AppBar position="absolute">
        <Toolbar>
          {avatar}
          <Typography variant="h6" style={{ paddingLeft: '1em' }}>
            {user.username}
          </Typography>
          <Typography variant="h6" style={{ paddingLeft: '0.1em' }}>
            @
          </Typography>
          <Typography variant="h6" style={{ paddingLeft: '0.1em' }} color="textSecondary">
            {group.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="flex-start" justify="center" style={{ height: '100%' }}>
        <Grid item />
        <Grid item xs={12} sm={selectedPaneType ? 5 : 6} className={classes.animatedGrid}>
          <Inventory groupname={group.name} token={session.token} />
        </Grid>
        <Divider orientation="vertical" className={classes.secondPane} />
        <Grid item xs={12} sm={5} className={`${classes.animatedGrid} ${classes.secondPane}`}>
          {choseSecondPane()}
        </Grid>
      </Grid>
    </Container>
  );
}
