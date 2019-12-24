import React from 'react';
import PropTypes from 'prop-types';
import { } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { PIC_ENDOINT } from '../connector';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


const mockLocations = [{
  where: 'Casa do Bonzas', amount: 10,
}, {
  where: 'Escritorio da empresa', amount: 10,
}, {
  where: 'Arrecadação', amount: 12,
}, {
  where: 'Arrecadação2', amount: 12,
}];

export default function Item({
  item, amount, hover,
}) {
  const date = new Date(item.updatedAt);
  const dateStr = timeAgo.format(date, 'twitter');
  const hoverInfo = (
    <div className="btn-group buttons" role="group">
      <button type="button" className="btn btn-light btnCustom">Add/Take</button>
      <button type="button" className="btn btn-light btnCustom">Remove</button>
      <button type="button" className="btn btn-light btnCustom">History</button>
    </div>
  );

  return (
    <div className="item card shadow-sm">
      <div className="row no-gutters">
        <div className="col-md-2">
          <img className="thumbnail card-img" src={PIC_ENDOINT(item.picurl)} alt={item.name} />
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <div className="row">
              <h6 className="row-md-12">{item.name}</h6>
            </div>
            <div className="row itemProperties">
              <li className=" itemamount">
                { amount }
                {' '}
                items
              </li>
              <li>{dateStr}</li>
            </div>
          </div>
        </div>
        <div className="col-md-6 expandcontainer">
          {hover ? hoverInfo : ''}
        </div>

      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    picurl: PropTypes.string.isRequired,
    updatedAt: PropTypes.date,
    storedAt: PropTypes.arrayOf(PropTypes.shape({
      where: PropTypes.string.isRequired,
      amount: PropTypes.number,
    })).isRequired,
  })).isRequired,
  amount: PropTypes.number,
  hover: PropTypes.bool,
};

Item.defaultProps = {
  amount: 0,
  hover: false,
};
