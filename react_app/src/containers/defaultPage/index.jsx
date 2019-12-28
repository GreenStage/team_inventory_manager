import React from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import Signin from './signin';
import Signup from './signup';
import Newgroup from './newgroup';
import './style.scss';

const storedPage = localStorage.getItem('defaultPage') || 'NEW_GROUP';

export default function DefaultPage() {
  const [page, setPage] = React.useState(storedPage);
  localStorage.setItem('defaultPage', page);

  function renderState() {
    const options = [
      <Button fullWidth key="signinOpt" onClick={() => setPage('SIGN_IN')} className="selectFormOption">Sign In</Button>,
      <Button fullWidth key="signupOpt" onClick={() => setPage('SIGN_UP')} className="selectFormOption">Sign Up</Button>,
      <Button fullWidth key="newGroupOpt" onClick={() => setPage('NEW_GROUP')} className="selectFormOption">Create Group</Button>,
    ];

    switch (page) {
      case 'SIGN_IN': return [options[1], options[2], <Signin />];
      case 'SIGN_UP': return [options[2], options[0], <Signup />];
      default: return [options[0], options[1], <Newgroup />];
    }
  }

  const renderS = renderState();

  return (
    <div className="enter">
      <Container maxWidth="xs">
        <Grid container direction="column" alignContent="center" justify="center">
          {renderS[2]}
          <Grid container alignItems="center" justify="center">
            <Grid item xs={4}>
              {renderS[0]}
            </Grid>
            <Grid item xs={4}>
              {renderS[1]}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
