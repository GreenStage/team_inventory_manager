import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { PIC_ENDOINT } from '../../connector';
import Inventory from '../inventory';

export default function GroupWindow() {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const session = useSelector((state) => state.session);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={PIC_ENDOINT(group.picurl)}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' '}
          {group.name}
        </Navbar.Brand>
      </Navbar>
      <Inventory groupname={group.name} token={session.token} />
    </div>
  );
}
