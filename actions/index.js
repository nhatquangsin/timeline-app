export const ADD_ACTIVITY = 'add activity';

export function addActivity(data) {
  return {
    type: ADD_ACTIVITY,
    payload: data,
  };
}
