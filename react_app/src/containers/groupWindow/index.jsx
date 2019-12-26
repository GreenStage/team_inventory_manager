import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PIC_ENDOINT } from '../../connector';
import Inventory from '../inventory';
import AddLocation from '../addlocation';
import ManageItem from '../manageItem';

export default function GroupWindow() {
  const user = useSelector((state) => state.user);
  const group = useSelector((state) => state.group);
  const session = useSelector((state) => state.session);

  return (
    <div>
      <nav className="navbar navbar-dark navtop">
        <span className="col-sm-2 navbar-brand mb-0 h2 menuHeader">
          <img
            alt=""
            src={PIC_ENDOINT(group.picurl)}
            width="30"
            height="30"
            className="d-inline-block align-center"
          />
          {' '}
          {group.name}
        </span>
      </nav>
      <div className="container-fluid">
        <div className="row contentPage">
          <div className="col-sm-2 colLeft" />
          <div className="col-sm-5 colMid">
            <Inventory groupname={group.name} token={session.token} />
          </div>
          <div className="col-sm-5 colRight">
            <ManageItem/>
          </div>
        </div>
      </div>
    </div>
  );
}
