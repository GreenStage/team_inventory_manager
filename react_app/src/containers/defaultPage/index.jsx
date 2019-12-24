import React from 'react';
import { Row, Col } from 'react-bootstrap';
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
      <Col key="signinOpt" onClick={() => setPage('SIGN_IN')} className="selectFormOption">Sign In</Col>,
      <Col key="signupOpt" onClick={() => setPage('SIGN_UP')} className="selectFormOption">Sign Up</Col>,
      <Col key="newGroupOpt" onClick={() => setPage('NEW_GROUP')} className="selectFormOption">Create Group</Col>,
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
      <Row>
        <Col sm={8}>
          <img className="logo" alt="logo" src="img/logo.svg" />
          <Row className="selectForm">
            {[<Col key="dummycol" sm={3} />, renderS[0], renderS[1]]}
          </Row>
        </Col>
        <Col>
          {renderS[2]}
        </Col>
      </Row>
    </div>
  );
}
