import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@material-ui/core';
import { addItem } from '../../actions';

const noError = {
  where: false,
  amount: false,
  warningWhere: '',
  warningAmount: '',
};

export default function AddItem({ item, locations }) {
  const [where, setWhere] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState({ ...noError });

  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    const am = parseInt(amount, 10);
    const newErr = { ...noError };
    const location = where._id ? where : locations.find((l) => l.namelower === where.toLowerCase());

    if (am <= 0) {
      newErr.amount = true;
      newErr.warningAmount = 'Invalid amount';
    }

    if (!location) {
      newErr.where = true;
      newErr.warningWhere = 'Location not found';
    }

    if (!newErr.amount && !newErr.where) {
      dispatch(addItem(session, { item, location: where._id, amount: am }));
    }
    setError(newErr);
  }

  return (
    <Container style={{paddingLeft:0,paddingRight:0,paddingTop:"2em"}}>
      <Typography variant="h5">Add items</Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container justify="flex-start" alignItems="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="location_input"
              options={locations}
              getOptionLabel={(location) => location.name}
              onChange={(e, value) => setWhere(value)}
              renderInput={(params) => (
                <TextField
                  error={error.where}
                  helperText={error.warningWhere}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Where"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="amountInput"
              error={error.amount}
              helperText={error.warningAmount}
              onChange={(e) => setAmount(e.target.value)}
              label="Quantity"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button className="addItemBtn" variant="dark" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

AddItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
