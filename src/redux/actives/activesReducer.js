import words from "../../components/words/allWords";

const GET_ACTIVES = 'redux/actives/GET_ACTIVES';
const COMPLETE_ACTIVE = 'redux/actives/UPDATE_ACTIVES';

const getActiveWords = (completed) => (dispatch) => {
  const possibles = words.filter(word => !completed.includes(word));
  possibles.sort(() => 0.5 - Math.random());
  const activeWord = possibles[0];

  dispatch({
    type: GET_ACTIVES,
    playload: activeWord
  })
}

const completeActiveWord = (active) => (dispatch) => {
  const newActive = [...active];
  newActive.completed = true;

  dispatch({
    type: COMPLETE_ACTIVE,
    playload: newActive,
  })
}

const checkAnswer = (answer, active) => {
  const filter = answer.toLowerCase();
  if (active.some(active => active.s.includes(filter))){
    completeActiveWord(active);
  } else {
    console.log('Nope')
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ACTIVES:
      return action.playload;
    case UPDATE_ACTIVES:
      return action.playload;
    default:
      return state;
  }
}

export default reducer;
export { getActiveWords };