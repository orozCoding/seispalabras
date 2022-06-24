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

export { fetchLogin, fetchSignup, fetchSession, fetchWordList, fetchCreateWordList };