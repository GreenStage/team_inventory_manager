import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const values = {};

export default function EnterForm({ fields, submit, validated }) {
  const fieldsJsx = fields.map((field) => (
    <Form.Group controlId={field.id} key={field.id}>
      <Form.Label>{field.name}</Form.Label>
      <Form.Control
        required
        type={field.type || 'text'}
        placeholder={field.placeholder}
        onChange={(e) => { values[field.id] = e.target.value; }}
      />
    </Form.Group>
  ));

  return (
    <div className="logintab">
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => submit.handle(e, values)}
        className="loginForm"
      >
        {fieldsJsx}
        <Button className="signInBtn" variant="dark" type="submit">
          {submit.value}
        </Button>
      </Form>
    </div>
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
  }).isRequired,
  validated: PropTypes.bool.isRequired,
};
