import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllWords, fetchWordList, fetchCreateWordList, fetchTranslations, filterCompleted } from "./shared/fetches";

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

const createActiveWords = async (token) => {
  let words = await fetchAllWords();
  let possibles = [];
  let activeWords = [];
  // let completed = JSON.parse(localStorage.getItem('completed'));
  let completed = await fetchTranslations(token);
  if (completed.length > 0) {
    completed = filterCompleted(completed)
    possibles = filterArrays(words, completed);
    possibles.sort(() => 0.5 - Math.random());
    activeWords = possibles.splice(0, 6);
    fetchCreateWordList(token, activeWords);
    return activeWords;
  } 
  possibles = [...words]
  possibles.sort(() => 0.5 - Math.random());
  activeWords = possibles.splice(0, 6);
  fetchCreateWordList(token, activeWords);
  return activeWords;
}

const checkActiveWords = async (token) => {
  const serverList = await fetchWordList(token);
  const today = new Date().getDate();
  const lastDate = new Date(serverList.updated_at).getDate()

  if (serverList && today === lastDate) {
    return JSON.parse(serverList.list);
  }

  if (!serverList || today !== lastDate){
    return await createActiveWords(token);
  }

}

const populateActiveWords = async (token) => {
  // const active = await fetchWordList();
  const active = await checkActiveWords(token);
  // storageActiveWords(active);

  return active
};

const setNewActiveWords = (payload, state) => {

  const {active, token} = payload;

  let newActives = state.map((word) => {
    if (word.id === active.id) {
      word = {...word, completed: true, tried: false}
    }
    return word;
  })
  
  // storageActiveWords(newActives);
  fetchCreateWordList(token, newActives);

  return newActives;
}

const handleWrongGuess = (state, active) => {
  let newActives = state.map((word) => {
    if (word.id === active.id) {
      word = {...word, tried: true}
    }
    return word
  })

  // storageActiveWords(newActives);

  return newActives;
}

export const getActiveWords = createAsyncThunk(
  'active/getActiveWords',
  async (token) => {
    const response = await populateActiveWords(token);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);


const initialState = [];

export const activesSlice = createSlice({
  name: 'actives',
  initialState,
  reducers: {
    completeActiveWord: (state, action) => {
      state = setNewActiveWords(action.payload, state)
      return state
    },
    wrongGuess: (state, action) => {
      const active = action.payload
      state = handleWrongGuess(state, active)
      return state;
    },
    restoreActives: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getActiveWords.fulfilled, (state, action) => {
      return state = action.payload
    })
  }
})

export const { completeActiveWord, wrongGuess, restoreActives } = activesSlice.actions;


export default activesSlice.reducer;
