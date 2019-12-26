import React from 'react';
import PropTypes from 'prop-types';
import { } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { PIC_ENDOINT } from '../connector';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function Item({
  item, amount, hover, onClick,
}) {
  const date = new Date(item.updatedAt);
  const dateStr = timeAgo.format(date, 'twitter') || 'Just now';

  return (
    <div className="item card shadow-sm slideInDown" role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      <div className="row no-gutters">
        <div className="col-md-2">
          <img className="thumbnail card-img" src={PIC_ENDOINT(item.picurl)} alt={item.name} />
        </div>
        <div className="col-md-7">
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
        <div className="col-md-3 expandcontainer">
          <div className={hover? "arrow arrowh" : "arrow"}>
            <div className="arrow-top" />
            <div className="arrow-bottom" />
          </div>
        </div>

      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picurl: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    storedAt: PropTypes.arrayOf(PropTypes.shape({
      where: PropTypes.string.isRequired,
      amount: PropTypes.number,
    })).isRequired,
  }).isRequired,
  amount: PropTypes.number,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  amount: 0,
  hover: false,
  onClick: () => {},
};
