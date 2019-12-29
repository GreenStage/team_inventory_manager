export default function uploads(state = {}, action) {
  const newState = state;
  switch (action.type) {
    case 'UPLOADED':
    case 'UPLOADING':
      newState[action.inputName] = {
        status: action.type,
        data: action.data,
      };
      return newState;
    default:
      return state;
  }
}
