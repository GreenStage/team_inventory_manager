import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container, AppBar, Toolbar, Typography, Avatar, Grid, Divider,
} from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import { PIC_ENDOINT } from '../../connector';
import Inventory from '../inventory';
import ManageItem from '../manageItem';

const defaultPicUrl = 'default_group_pic.png';

export default function GroupWindow() {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const session = useSelector((state) => state.session);

  let avatar;
  if (user.picurl === defaultPicUrl) {
    avatar = <Avatar edge="start" alt={user.username} src={PIC_ENDOINT(group.picurl)} />;
  } else {
    avatar = <Avatar edge="start">{user.username.charAt(0).toUpperCase()}</Avatar>;
  }

  return (
    <Container maxWidth={false} style={{paddingTop:"5em",height:"100%"}}>
      <AppBar position="absolute">
        <Toolbar>
          {avatar}
          <Typography variant="h6" style={{paddingLeft:"1em"}}>
            {user.username}
          </Typography>
          <Typography variant="h6" style={{paddingLeft:"0.1em"}}>
            @
          </Typography>
          <Typography variant="h6" style={{paddingLeft:"0.1em"}} color="textSecondary">
            {group.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="flex-start" justify="center" style={{height:"100%"}}>
        <Grid item />
        <Grid item xs={12} sm={5}>
          <Inventory groupname={group.name} token={session.token} />
        </Grid>
        <Divider orientation="vertical"/>
        <Grid item xs={12} sm={5}>
          <ManageItem />
        </Grid>
      </Grid>
    </Container>
  );
}
