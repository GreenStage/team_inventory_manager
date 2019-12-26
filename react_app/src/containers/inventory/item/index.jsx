/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ItemInner from '../../../components/item';
import { selectItem } from '../../../actions/inventory';

export default function Item({ style, data }) {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.selectedItem);

  function getTotalAmount() {
    const arr = data.storedAt || [];
    return arr.reduce((sum, loc) => sum + loc, 0);
  }

  const setStyle = { ...style };
  if (selectedItem._id === data._id) {
    setStyle.pointerEvents = 'none';
  }

  return (
    <div style={setStyle}>
      <div
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ItemInner onClick={() => dispatch(selectItem(data))} item={data} hover={hover} amount={getTotalAmount()} />
      </div>
    </div>
  );
}

Item.propTypes = {
  style: PropTypes.shape({}),
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picurl: PropTypes.string.isRequired,
    storedAt: PropTypes.arrayOf(PropTypes.shape({
      where: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

Item.defaultProps = {
  style: {},
};
