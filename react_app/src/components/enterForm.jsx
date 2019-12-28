import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

const values = {};

export default function EnterForm({ fields, submit, validated }) {
  const fieldsJsx = fields.map((field) => (
    <TextField
      key={field.name}
      label={field.name}
      type={field.type || 'text'}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      InputProps={{
        endAdornment: field.endAdornment,
      }}
      onChange={(e) => { values[field.id] = e.target.value; }}
    />

  ));

  return (
    <form
      noValidate
      validated={validated}
      onSubmit={(e) => submit.handle(e, values)}
    >
      {fieldsJsx}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        {submit.value}
      </Button>
    </form>
  );
}

EnterForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  submit: PropTypes.shape({
    value: PropTypes.string.isRequired,
    handle: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
  }).isRequired,
  validated: PropTypes.bool.isRequired,
};
