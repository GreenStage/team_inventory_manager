import React, { useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Avatar,
  Tab,
  Tabs,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { PIC_ENDOINT } from '../../connector';
import AddItem from './storeItem';

export default function ManageItem() {
  const [selectedTab, setSelectedTab] = useState(0);
  const item = useSelector((state) => state.inventory.items.byId[state.selectedPane.itemid]) || {};
  const locations = useSelector((state) => state.group.locations);
  const storedLocs = item.storedAt || [];
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  return (
    <Container>
      <Typography variant="h4" style={{ paddingTop: '0.3em' }}>
        Manage Item
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{ paddingTop: '1.8em' }}
      >
        <Avatar alt={item.name} src={item.picurl || ''} />

        <Typography variant="h6" style={{ paddingLeft: '1em' }}>
          {item.name}
        </Typography>


      </Grid>
      <Tabs
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, v) => setSelectedTab(v)}
        variant="fullWidth"
        style={{ paddingLeft: '0.5em', paddingRight: '0.5em' }}
      >
        <Tab label="Store" />
        <Tab label="Take" />
        <Tab label="Transfer" />
      </Tabs>
      <SwipeableViews
        axis="x-reverse"
        index={selectedTab}
        containerStyle={{ height: 100 }}
        onChangeIndex={selectedTab}
      >
        <AddItem item={item} locations={locations} />

      </SwipeableViews>
      <TableContainer style={{ width: '100%' }}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                Stored at
              </TableCell>
              <TableCell align="right">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storedLocs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((loc) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={loc.where}>
                <TableCell align="left">
                  {locations.find((l) => l._id === loc.where).name}
                </TableCell>
                <TableCell align="right">
                  {loc.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  );
}
