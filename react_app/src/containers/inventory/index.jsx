import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Item from '../item';
import './style.scss';
import { loadInventory } from '../../actions';
import { Container } from 'react-bootstrap';

export default function Inventory({ groupname, token }) {
  const inventory = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (inventory.status === 'INVENTORY_UNLOADED') {
      dispatch(loadInventory({ groupname, token }));
    }
  });

  let retJsx = '';
  switch (inventory.status) {
    case 'INVENTORY_LOADED':
      retJsx = inventory.items.map((item) => (
        // eslint-disable-next-line no-underscore-dangle
        <Item key={item._id} data={item} />
      ));
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
  return (
    <Container fluid className="inventory">
      <div className="inventoryTitle">
        <h3>Inventory</h3>
        {retJsx}
      </div>
    </Container>
  );
}

Inventory.propTypes = {
  groupname: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
