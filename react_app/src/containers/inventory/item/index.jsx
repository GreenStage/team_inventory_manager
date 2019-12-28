/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ItemInner from '../../../components/item';
import { selectItem } from '../../../actions/inventory';

export default function Item({ style, id }) {
  const [hover, setHover] = useState(false);

  const dispatch = useDispatch();
  const item = useSelector((state) => {
    return state.inventory.items.byId[id];
  });
  const isSelected = useSelector((state) => state.selectedItemId === id);

  function getTotalAmount() {
    const arr = item.storedAt || [];
    return arr.reduce((sum, loc) => sum + loc.amount, 0);
  }

  const setStyle = { ...style };
  if (isSelected) {
    setStyle.pointerEvents = 'none';
  }

  return (
    <div style={setStyle}>
      <div
        onActive
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ItemInner
          onClick={() => dispatch(selectItem(item))}
          item={item}
          hover={hover}
          active={isSelected}
          amount={getTotalAmount()}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  style: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
};

Item.defaultProps = {
  style: {},
};
