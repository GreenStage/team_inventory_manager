import React, { useRef, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Avatar,
  Hidden,
  Box,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { createItem } from '../../actions';


const error = {
  name: false,
  pic: false,
  warningName: '',
  warningPic: '',
};
const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  thumbSize: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

export default function CreateItem() {
  const itemname = useRef('');
  const uploadPicName = 'create_item_pic';
  const uploadInput = useRef(null);
  const session = useSelector((state) => state.session);
  const loading = useSelector((state) => state.loading['ITEM_CREATE']);
  const [picPreview, setPicPreview] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  function setItemName(name) {
    itemname.current = name;
  }

  function createItemH(e) {
    e.preventDefault();
    const inputName = uploadInput.current.name;
    const file = uploadInput.current.files[0];
    dispatch(createItem(session, inputName, file, itemname.current));
  }

  function setPic() {
    const file = uploadInput.current.files[0];
    setPicPreview(URL.createObjectURL(file));
  }
  if(loading) alert("loading")
  return (
    <Container>
      <Typography variant="h4" style={{ paddingTop: '0.3em', paddingBottom: '1em' }}>
        Create Item
      </Typography>

      <Box style={{ paddingTop: '0.8em' }}>
        <form onSubmit={createItemH}>
          <Grid container direction="row" justify="flex-start" alignItems="stretch" >
            <Grid item>

              <Avatar
                variant="rounded"
                className={classes.thumbSize}
                src={picPreview || ''}
              >
pic
              </Avatar>
              <Grid container justify="flex-start">

                <Grid item>
                  {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </Grid>
              </Grid>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={1} />
            </Hidden>
            <Grid item>
              <Grid container direction="column" alignItems="flex-start" style={{height:"90%"}} justify="space-between">
                <Grid item style={{ paddingLeft: '0', paddingTop: '0' }}>
                  <TextField
                    id="itemname"
                    style={{ padding: '0' }}
                    error={error.name}
                    helperText={error.warningName}
                    onChange={(e) => setItemName(e.target.value)}
                    label="Item name"
                    type="text"
                  />
                </Grid>
                <Grid
                  item
                  style={{ paddingLeft: '0' }}
                >
                  <input
                    ref={uploadInput}
                    name={uploadPicName}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="outlined-button-file"
                    multiple
                    onChange={() => setPic()}
                    type="file"
                  />
                  <label htmlFor="outlined-button-file">

                    <Button
                      variant="text"
                      color="default"
                      component="span"
                      disabled={loading}
                      style={{ paddingLeft: '0' }}
                    >
                    Select image
                    </Button>
                  </label>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>


          </Grid>
        </form>
      </Box>
    </Container>

  );
}
