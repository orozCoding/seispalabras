import words from "../../components/words/allWords";

const GET_ACTIVES = 'redux/actives/GET_ACTIVES';
const COMPLETE_ACTIVE = 'redux/actives/UPDATE_ACTIVES';

const getActiveWords = (completed) => (dispatch) => {
  let possibles = [];
  let activeWord = [];
  if (completed.length) {
    possibles = words.filter(word => !completed.includes(word));
    possibles.sort(() => 0.5 - Math.random());
    activeWord = possibles[0];
  } else {
    possibles = [...words]
    possibles.sort(() => 0.5 - Math.random());
    activeWord = [possibles[0]];
  }

  dispatch({
    type: GET_ACTIVES,
    playload: activeWord,
  });
};

const completeActiveWord = (active) => (dispatch) => {
  console.log('si llegué');
  const newActive = [...active];
  newActive.completed = true;

  dispatch({
    type: COMPLETE_ACTIVE,
    playload: newActive,
  })
}

const checkAnswer = (answer, active) => (dispatch) => {
  const filter = answer.toLowerCase();
  const resultDiv = document.querySelector('.resultDiv');
  if (active.some(active => active.s.includes(filter))) {
    resultDiv.innerHTML = 'correct';
    dispatch(completeActiveWord(active));
  } else {
    resultDiv.innerHTML = 'not at all';
  }
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ACTIVES:
      return action.playload;
    case COMPLETE_ACTIVE:
      return action.playload;
    default:
      return state;
  }
}

export default reducer;
export { getActiveWords, checkAnswer };