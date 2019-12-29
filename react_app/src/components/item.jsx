import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {
  Card, Grid, CardActionArea, Container, Typography, CardContent, Hidden, CardMedia, Avatar,
} from '@material-ui/core';
import { PIC_ENDOINT } from '../connector';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

function getItemThumbnail(itemname, picurl) {
  if (picurl === 'default_group_pic.png') {
    const letters = itemname.split(' ')
      .filter((v, i) => i < 2)
      .map((name) => name.charAt(0).toUpperCase());
    return (
      <Avatar
        style={{ width: '100%', height: '100%' }}
        variant="square"
      >
        { letters }
      </Avatar>
    );
  }
  return (
    <Avatar
      style={{ width: '100%', height: '100%' }}
      variant="square"
      alt={itemname}
      src={picurl}
    />
  );
}

function Item({
  item, amount, hover, active, onClick,
}) {
  let arrowClass = 'arrow';
  if (active) arrowClass = 'arrow arrowa';
  else if (hover) arrowClass = 'arrow arrowh';

  const date = new Date(item.updatedAt);
  const dateStr = timeAgo.format(date, 'twitter') || 'Just now';

  return (
    <Card onClick={((e) => onClick(e))}>
      <CardActionArea>
        <Grid container justify="flex-start">
          <Grid item xs={3} sm={2}>
            <CardMedia
              style={{ backgroundColor: '#F5F5F5', height: '100%' }}
              title={item.name}
            >
              {getItemThumbnail(item.name, item.picurl)}
            </CardMedia>
          </Grid>
          <Grid item xs={9} sm={7}>
            <CardContent style={{ paddingTop: '15px', paddingBottom: '15px' }}>
              <Typography gutterBottom variant="h6" component="h2">
                {item.name}
              </Typography>
              <Grid container justify="flex-start" alignItems="center">
                <Typography variant="body2" color="textSecondary" component="p">
                  { amount }
                  {' '}
                  items
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ paddingLeft: '10px' }} component="p">
                  {dateStr}
                </Typography>
              </Grid>
            </CardContent>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={3}>
              <Grid container justify="flex-end">
                <div className={arrowClass}>
                  <div className="arrow-top" />
                  <div className="arrow-bottom" />
                </div>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </CardActionArea>
    </Card>
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
  active: PropTypes.bool,
};

Item.defaultProps = {
  amount: 0,
  hover: false,
  onClick: () => {},
  active: false,
};

export default React.memo(Item);
