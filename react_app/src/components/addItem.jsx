import React from 'react';
import PropTypes, { shape } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {
  Button, Box,
} from '@material-ui/core';


function AddItem({
  onSubmit,
  setWhere,
  error,
  locNames,
  setAmount,
}) {
  return (
    <Box style={{padding:".4em"}}>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="location_input"
              options={locNames}
              freeSolo
              onChange={(e, value) => setWhere(value)}
              onKeyUp={(e) => setWhere(e.target.value)}
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
              onChange={(e) => setAmount(Number(e.target.value))}
              label="Quantity"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={2} style={{ height: '100%', paddingTop: '1em' }}>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

AddItem.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setWhere: PropTypes.func.isRequired,
  error: PropTypes.shape({
    where: PropTypes.bool,
    amount: PropTypes.bool,
    warningWhere: PropTypes.string,
    warningAmount: PropTypes.string,
  }),
  locNames: PropTypes.arrayOf(PropTypes.string),
  setAmount: PropTypes.func.isRequired,
};

AddItem.defaultProps = {
  error: {
    where: false,
    amount: false,
    warningWhere: '',
    warningAmount: '',
  },
  locNames: [],
};

export default React.memo(AddItem);
