import React from 'react';
import { useDispatch } from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputAdornment, IconButton } from '@material-ui/core';
import EnterForm from '../../components/enterForm';
import { signin } from '../../actions';

export default function Signin() {
  const [validated, setValidated] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  function onClickSubmit(event, values) {
    event.preventDefault();
    setValidated(true);
    if (event.currentTarget.checkValidity()) {
      dispatch(signin(values));
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
          type: showPassword ? 'text' : 'password',
          endAdornment: (
            <InputAdornment>
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      ]}
      submit={{
        value: 'Sign In',
        handle: (event, values) => onClickSubmit(event, values),
      }}
      validated={validated}
    />
  );
}
