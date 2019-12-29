import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Grid, CircularProgress, Typography, Hidden, List, ListItem, Fab, Paper, Tooltip,
} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { loadInventory, searchInventory, insertItem } from '../../actions';

import Item from './item';
import './style.scss';


let typingTimer;
export default function Inventory({ groupname, token }) {
  const inventoryStatus = useSelector((state) => state.inventory.status);
  const itemIds = useSelector((state) => state.inventory.items.allIds);
  let filterQuery = React.createRef('');

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  React.useEffect(() => {
    if (inventoryStatus === 'INVENTORY_UNLOADED') {
      dispatch(loadInventory({ groupname, token }));
    }
  });

  let itemsJsx = '';
  let retJsx = '';
  let displayItems = [];

  switch (inventoryStatus) {
    case 'INVENTORY_LOADED':
      if (itemIds.length === 0) {
        itemsJsx = (
          <CSSTransition
            key={"no_item"}
            timeout={5000}
            appear
            classNames="itemOnList"
          >
            <Typography
              style={{ paddingTop: '3em' }}
              variant="h5"
              align="center"
            >
            No items in inventory
            </Typography>

          </CSSTransition>
        );
      } else {
        itemsJsx = itemIds.map((id, index) => (
          <CSSTransition
            key={id}
            timeout={5000}
            appear
            classNames="itemOnList"
          >
            <ListItem style={{ transitionDelay: `${index * 0.1}s`, paddingLeft: 0, paddingRight: 0 }}>
              <Item id={id} style={{ width: '100%' }} />
            </ListItem>
          </CSSTransition>
        ));
      }

      retJsx = (
        <List style={{ paddingTop: '1.3em' }}>
          <TransitionGroup className="itemsWrapper">
            {itemsJsx}
          </TransitionGroup>
        </List>
      );
      break;
    default:
      retJsx = (<Grid container justify="center"><CircularProgress style={{ marginTop: '3em' }} /></Grid>);
  }

  function search(value) {
    dispatch(searchInventory({ groupname, token }, value));
  }

  function onChangeSearch(value) {
    setSearchValue(value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (value) {
        search(value);
      } else {
        filterQuery.current = value;
        dispatch(loadInventory({ groupname, token }));
      }
    }, 300);
  }

  return (
    <Container>
      <Grid container justify="space-between">
        <Typography variant="h4" style={{ paddingTop: '0.3em' }}>
          Inventory
        </Typography>

        <Tooltip title="Insert new item">
          <Fab color="primary" aria-label="add" onClick={() => dispatch(insertItem())}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
      <Grid container style={{ paddingTop: '1.8em' }}>
        <Hidden xsDown>
          <Grid item sm={6}>
            <Typography variant="h5" style={{ paddingTop: '0.3em' }}>
              Recently Updated
            </Typography>
          </Grid>
        </Hidden>
        <Grid item sm={6}>
          <SearchBar
            value={searchValue}
            onChange={(v) => onChangeSearch(v)}
            onRequestSearch={() => {}}
          />
        </Grid>
      </Grid>

      {retJsx}
    </Container>
  );
}

Inventory.propTypes = {
  groupname: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
