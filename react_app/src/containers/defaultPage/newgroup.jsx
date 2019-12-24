import React from 'react';
import { useDispatch } from 'react-redux';
import EnterForm from '../../components/enterForm';
import { creategroup } from '../../actions';

export default function NewGroup() {
  const [validated, setValidated] = React.useState(false);
  const dispatch = useDispatch();

  function onClickSubmit(event, values) {
    event.preventDefault();
    setValidated(true);
    if (event.currentTarget.checkValidity()) {
      dispatch(creategroup(values));
    }
  }

  return (
    <EnterForm
      fields={[
        {
          id: 'groupname',
          name: 'Group name',
          placeholder: 'Your group name here',
          warning: 'Invalid groupname',
        },
        {
          id: 'username',
          name: 'Username',
          placeholder: 'Your username here',
          warning: 'Invalid username',
        },
        {
          id: 'password',
          name: 'Password',
          placeholder: 'Your password here',
          warning: 'Invalid password',
          type: 'password',
        },
      ]}
      submit={{
        value: 'Create Group',
        handle: (event, values) => onClickSubmit(event, values),
      }}
      validated={validated}
    />
  );
}
