
export default function handleError(fn) {
  return function errHandler(dispatch) {
    fn(dispatch).catch((error) => {
      alert(error.message);
      dispatch({ type: 'ERROR', error });
    });
  };
}