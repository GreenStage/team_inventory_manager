import { combineReducers } from 'redux';
import user from './user';
import status from './status';
import group from './group';
import session from './session';
import error from './error';
import inventory from './inventory';
import selectedPane from './selectedPane';
import loading from './loading';

export default combineReducers({
  user,
  group,
  status,
  session,
  error,
  inventory,
  selectedPane,
  loading,
});
