import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultPage from './containers/defaultPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { restoreSession } from './actions';
import GroupWindow from './containers/groupWindow';


export default function App() {
  const session = useSelector((state) => state.session);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (session && session.token && status === 'IDLE') {
      // restore session data
      dispatch(restoreSession(session));
    }
  });

  function decideRender() {
    switch (status) {
      case 'SESSION_LOADED': return <GroupWindow />;
      case 'IDLE':
        return <div className="enterWrapper"><DefaultPage /></div>;
      default:
        return (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="App">
      {decideRender()}
    </div>
  );
}
