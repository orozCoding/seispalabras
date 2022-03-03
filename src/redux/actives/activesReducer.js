import words from "../../components/words/allWords";

const GET_ACTIVES = 'redux/actives/GET_ACTIVES';
const COMPLETE_ACTIVE = 'redux/actives/UPDATE_ACTIVES';

const filterArrays = (arr1, arr2) => {
  let arr = [...arr1];
  for (let i = 0; i < arr1.length; i++) {

    for (let x = 0; x < arr2.length; x++) {

      if (arr1[i].id === arr2[x].id) {
        arr.splice(arr.indexOf(arr1[i]), 1);
      }

    }

  }
  return arr;
}

const getActiveWords = () => (dispatch) => {
  let possibles = [];
  let activeWord = [];
  let completed = JSON.parse(localStorage.getItem('completed'));
  if (completed.length) {
    console.log('aca toy');
    possibles = filterArrays(words,completed);
    console.log('estos son los possibles ahora');
    console.log(possibles);
    possibles.sort(() => 0.5 - Math.random());

    activeWord = [possibles[0]];

  } else {
    console.log('me fui por else');
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
    return true;
  } else {
    resultDiv.innerHTML = 'not at all';
    return false;
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