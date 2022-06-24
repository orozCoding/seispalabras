import words from "../../components/words/allWords"

const baseURL = 'http://localhost:3000'

const fetchLogin = async (input) => {
  const url = `${baseURL}/auth/login`

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data)

  return resp
}

const fetchSession = async (token) => {
  const url = `${baseURL}/session`

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
    .then((resp) => resp.json())
    .then((data) => data)

  return resp
}

const fetchSignup = async (input) => {
  const url = `${baseURL}/users`
  console.log(JSON.stringify(input));

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data)

  return resp
}

const fetchWordList = async (token) => {
  const url = `${baseURL}/words_lists/`

  const resp = await fetch(url,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
    .then((resp) => resp.json())
    .then((data) => data);

  if(!resp) {
    return false;
  }
  return resp
}

const fetchCreateWordList = async (token, input) => {
  const url = `${baseURL}/words_lists/`

  const wordList = { list: JSON.stringify(input)}

  const resp = await fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(wordList)
  })
    .then((resp) => resp.json())
    .then((data) => data);

  
  return resp
}

const fetchTranslations = async (token) => {
  const url = `${baseURL}/translations`

  const resp = await fetch(url,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return [...resp]
}

const fetchCreateTranslation = async (token, word) => {
  const url = `${baseURL}/translations`
  
  console.log('estoy dentro del fetch');
  console.log('esto es word');
  console.log(word);

  console.log(token);
  console.log(url);

  const input = {
    word: word.e,
    word_id: word.id
  }

  console.log('esto es input');
  console.log(input);
  console.log(JSON.stringify(input));

  const resp = await fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(input)
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp
}

const filterCompleted = (translations) => {
  let res = []; 

  translations.forEach((word) => {
    word = words.filter((el) => el.id === word.word_id)
    res.push(word[0])
  })

  return res
}

export { fetchLogin, fetchSignup, fetchSession,
  fetchWordList, fetchCreateWordList, fetchTranslations,
  fetchCreateTranslation,filterCompleted };