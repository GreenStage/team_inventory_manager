import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../actions';
import AddItem from '../../components/addItem';

const noError = {
  where: false,
  amount: false,
  warningWhere: '',
  warningAmount: '',
};

export default function StoreItem({ item, locations }) {
  const [where, setWhere] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState({ ...noError });

  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    const am = parseInt(amount, 10);
    const newErr = { ...noError };
    if (am <= 0) {
      newErr.amount = true;
      newErr.warningAmount = 'Invalid amount';
    } else if (where.length < 4) {
      newErr.where = true;
      newErr.warningWhere = 'Location must have more than 4 characters';
    } else {
      dispatch(addItem(session, { item, locationName: where, amount: am }));
    }
    setError(newErr);
  }

  return (
    <AddItem
      onSubmit={onSubmit}
      where={where}
      setWhere={setWhere}
      error={error}
      locNames={locations.map((l) => l.name)}
      amount={amount}
      setAmount={setAmount}
    />
  );
}

StoreItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
};

StoreItem.defaultProps = {
  locations: [],
};
