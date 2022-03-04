import words from "../../components/words/allWords";
import { checkSameDay, storageNewDay } from "../../components/dates/dates";

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

const loadActiveWords = () => {
  if (localStorage.getItem('activeWords') === 'undefined'){
    return false;
  }
  return JSON.parse(localStorage.getItem('activeWords'));
}

const storageActiveWords = (words) => {
  localStorage.setItem('activeWords', JSON.stringify(words))
}

const createActiveWords = () => {
  let possibles = [];
  let activeWords = [];
  let completed = JSON.parse(localStorage.getItem('completed'));
  if (completed.length) {
    possibles = filterArrays(words, completed);
    possibles.sort(() => 0.5 - Math.random());
    activeWords = possibles.splice(0, 3);
    return activeWords;
  } else {
    possibles = [...words]
    possibles.sort(() => 0.5 - Math.random());
    activeWords = possibles.splice(0, 3);
    return activeWords;
  }
}

const checkActiveWords = () => {
  if(loadActiveWords() && checkSameDay()){
    return loadActiveWords();
  }
  return createActiveWords();
}

const getActiveWords = () => (dispatch) => {
  const active = checkActiveWords();

  storageActiveWords(active);
  storageNewDay();

  dispatch({
    type: GET_ACTIVES,
    playload: active,
  });
};

const completeActiveWord = (active, actives) => (dispatch) => {
  const newActives = [...actives];
  newActives.map((word) => {
    if (word.id === active.id)
      word.completed = true;
  })

  storageActiveWords(newActives);

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