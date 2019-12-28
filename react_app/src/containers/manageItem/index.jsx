import React from 'react';
import {
  Tooltip,
  IconButton,
  Grid,
  ListItemSecondaryAction,
  ListItem,
  List,
  Container,
  Typography,
  Avatar,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { PIC_ENDOINT } from '../../connector';
import AddItem from './addItem';

export default function ManageItem() {
  const item = useSelector((state) => state.inventory.items.byId[state.selectedItemId]) || {};

  const locations = useSelector((state) => state.group.locations);
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const storedLocs = item.storedAt || [];
  return (
    <Container>
      <Typography variant="h4" style={{paddingTop:"0.3em"}}>
        Manage Item
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{paddingTop:"1.8em"}}
      >
        <Avatar alt={item.name} src={PIC_ENDOINT(item.picurl)} alt={item.name} />
        <Typography variant="h6" style={{paddingLeft:"1em"}}>
          {item.name}
        </Typography>
      </Grid>
      <AddItem item={item} locations={locations} />
      <List dense={false}>
        {storedLocs.map((l) => (
          <ListItem disableGutters key={l.where}>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
              <Grid item xs={6}>{locations.find((loc) => loc._id === l.where).name}</Grid>
              <Grid item xs={4}>{l.amount}</Grid>
              <Grid item xs={2}>
                <ListItemSecondaryAction>
                  <Tooltip title="Edit">
                    <IconButton edge={false} aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
