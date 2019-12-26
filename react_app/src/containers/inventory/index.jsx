import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SearchBar from '../../components/searchbar';
import { loadInventory, searchInventory } from '../../actions';

import Item from './item';
import './style.scss';

let typingTimer;
export default function Inventory({ groupname, token }) {
  const inventory = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (inventory.status === 'INVENTORY_UNLOADED') {
      dispatch(loadInventory({ groupname, token }));
    }
  });

  let itemsJsx = '';
  let retJsx = '';

  switch (inventory.status) {
    case 'INVENTORY_LOADED':
      itemsJsx = inventory.items.map((item, index) => (
        <CSSTransition
          key={item._id}
          timeout={5000}
          appear
          classNames="itemOnList"
        >
          <Item style={{ transitionDelay: `${index * 0.1}s` }} data={item} />
        </CSSTransition>
      ));
      retJsx = (
        <TransitionGroup className="itemsWrapper">
          {itemsJsx}
        </TransitionGroup>
      );
      break;
    default:
      retJsx = (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
  }

  function search(value) {
    dispatch(searchInventory({ groupname, token }, value));
  }

  function onChangeSearch(e) {
    clearTimeout(typingTimer);
    const { value } = e.target;
    typingTimer = setTimeout(() => {
      if (value) {
        search(value);
      } else {
        dispatch(loadInventory({ groupname, token }));
      }
    }, 300);
  }

  return (
    <Container fluid className="inventory">
      <div className="sectionTitle">
        <h4>Inventory</h4>
        <div className="row sectionSubtitle">
          <h5 className="sortTitle align-middle col-sm-6">Recently Updated</h5>
          <SearchBar
            className="searchInInventory col-sm-6"
            onChange={(e) => onChangeSearch(e)}
          />
        </div>
      </div>
      {retJsx}
    </Container>
  );
}

Inventory.propTypes = {
  groupname: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
