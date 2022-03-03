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
    possibles = filterArrays(words,completed);
    possibles.sort(() => 0.5 - Math.random());
    activeWord = possibles.splice(0,3);
  } else {
    possibles = [...words]
    possibles.sort(() => 0.5 - Math.random());
    activeWord = possibles.splice(0,3);
  }

  dispatch({
    type: GET_ACTIVES,
    playload: activeWord,
  });
};

const completeActiveWord = (active, actives) => (dispatch) => {
  const newActives = [...actives];
  newActives.map((word) => {
    if(word.id === active.id)
      word.completed = true;
  })

  dispatch({
    type: COMPLETE_ACTIVE,
    playload: newActives,
  })
}

const checkAnswer = (answer, active, actives) => (dispatch) => {
  answer = answer.toLowerCase();
  const resultDiv = document.querySelector('.resultDiv');
  let correctAnswers = [];
  active.s.forEach((word) => {
    word = word.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    word = word.toLowerCase();
    correctAnswers.push(word);
  })
  if (correctAnswers.includes(answer)) {
    resultDiv.innerHTML = 'correct';
    console.log(active);
    dispatch(completeActiveWord(active, actives));
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