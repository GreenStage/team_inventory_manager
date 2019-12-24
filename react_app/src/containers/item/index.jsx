import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { } from 'react-bootstrap';
import ItemInner from '../../components/item';

export default function Item({ className, data }) {
  const [hover, setHover] = useState(false);
  function getTotalAmount() {
    const arr = data.storedAt || [];
    return arr.reduce((sum, loc) => sum + loc, 0);
  }
  return (
    <div
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ItemInner className={className} item={data} hover={hover} amount={getTotalAmount()} />
    </div>
  );
}

Item.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picurl: PropTypes.string.isRequired,
    storedAt: PropTypes.arrayOf(PropTypes.shape({
      where: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};
