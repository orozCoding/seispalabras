const GET_COMPLETED = 'redux/completed/GET_COMPLETED';
const ADD_COMPLETED = 'redux/completed/ADD_COMPLETED';

const getCompleted = () => (dispatch) => {
  let completed = [];

  if (localStorage.getItem('completed')) {
    completed = JSON.parse(localStorage.getItem('completed'));
  }

  dispatch({
    type: GET_COMPLETED,
    playload: completed,
  })
};


const addCompleted = (active) => (dispatch) => {
  const completed = JSON.parse(localStorage.getItem('completed'));
  completed.push(active);
  localStorage.setItem('completed', JSON.stringify(completed));

  dispatch({
    type: ADD_COMPLETED,
    playload: completed,
  })
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_COMPLETED:
      return action.playload;
    case ADD_COMPLETED:
      return action.playload;
    default:
      return state;
  }
};

export default reducer;
export { getCompleted, addCompleted };