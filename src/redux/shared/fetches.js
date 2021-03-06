const baseURL = 'https://seispalabras.herokuapp.com';
// const baseURL = 'http://localhost:3000';

const fetchAllWords = async () => {
  const url = `${baseURL}/default/list`;

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchLogin = async (input) => {
  const url = `${baseURL}/auth/login`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchSession = async (token) => {
  const url = `${baseURL}/session`;

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchSignup = async (input) => {
  const url = `${baseURL}/users`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchWordList = async (token) => {
  const url = `${baseURL}/words_lists/`;

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  if (!resp) {
    return false;
  }
  return resp;
};

const fetchCreateWordList = async (token, input) => {
  const url = `${baseURL}/words_lists/`;

  const wordList = { list: JSON.stringify(input) };

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(wordList),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchTranslations = async (token) => {
  const url = `${baseURL}/translations`;

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return [...resp];
};

const fetchCreateTranslation = async (token, word) => {
  const url = `${baseURL}/translations`;

  const input = {
    word: word.e,
    word_id: word.id,
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const filterCompleted = async (translations) => {
  const res = [];
  const words = await fetchAllWords();

  translations.forEach((word) => {
    const realWord = words.filter((el) => el.id === word.word_id);
    res.push(realWord[0]);
  });

  return res;
};

const postResetPassword = async (email) => {
  const url = `${baseURL}/password/reset`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const testResetPasswordToken = async (token) => {
  const url = `${baseURL}/password/reset/edit`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchChangePassword = async (input) => {
  const url = `${baseURL}/password/reset/edit`;

  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => error);

  return resp;
};

export {
  fetchAllWords, fetchLogin, fetchSignup, fetchSession,
  fetchWordList, fetchCreateWordList, fetchTranslations,
  fetchCreateTranslation, filterCompleted,
  postResetPassword, testResetPasswordToken,
  fetchChangePassword,
};
