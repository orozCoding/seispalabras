import words from "../components/words/allWords";
import { checkSameDay, storageNewDay, checkNewDay } from "../components/dates/dates";
import { createSlice } from '@reduxjs/toolkit';

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
    activeWords = possibles.splice(0, 6);
    return activeWords;
  } else {
    possibles = [...words]
    possibles.sort(() => 0.5 - Math.random());
    activeWords = possibles.splice(0, 6);
    return activeWords;
  }
}

const checkActiveWords = () => {
  if (loadActiveWords() && checkSameDay()) {
    return loadActiveWords();
  } else if (loadActiveWords() && !checkNewDay()) {
    return loadActiveWords();
  }

  return createActiveWords();
}

const populateActiveWords = () => {
  const active = checkActiveWords();
  storageActiveWords(active);
  storageNewDay();

  return active
};

const setNewActiveWords = (active, actives) => {
  let newActives = actives.map((word) => {
    if (word.id === active.id) {
      word = {...word, completed: true, tried: false}
    }
    return word;
  })

  storageActiveWords(newActives);

  return newActives;
}

const handleWrongGuess = (state, active) => {
  let newActives = state.map((word) => {
    if (word.id === active.id) {
      word = {...word, tried: true}
    }
    return word
  })

  storageActiveWords(newActives);

  return newActives;
}


const initialState = [];

export const activesSlice = createSlice({
  name: 'actives',
  initialState,
  reducers: {
    getActiveWords: () => {
      return populateActiveWords();
    },
    completeActiveWord: (state, action) => {
      state = setNewActiveWords(action.payload, state)
      return state
    },
    wrongGuess: (state, action) => {
      const active = action.payload
      state = handleWrongGuess(state, active)
      return state;
    },
  }
})

export const { getActiveWords, completeActiveWord, wrongGuess } = activesSlice.actions;


export default activesSlice.reducer;
