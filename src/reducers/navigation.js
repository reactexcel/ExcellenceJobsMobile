import Root from '../container/router';

export default (state, action) => {
  const newState = Root.router.getStateForAction(action, state);
  return newState || state;
};
