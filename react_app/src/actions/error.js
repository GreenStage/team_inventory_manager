
export default function handleError(fn) {
  return function errHandler(dispatch) {
    fn(dispatch).catch((error) => {
      alert(error);
      dispatch({ type: 'ERROR', error });
    });
  };
}
