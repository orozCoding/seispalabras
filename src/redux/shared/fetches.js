const baseURL = 'https://seispalabras.herokuapp.com';
// const baseURL = 'http://localhost:3000';

const fetchWords = async (token) => {
  const url = `${baseURL}/words`;

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchTranslations = async (token) => {
  const url = `${baseURL}/translations`;

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchLogin = async (input) => {
  const url = `${baseURL}/auth/login`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const fetchCreateTranslation = async (token, used_word, word_id) => {
  const url = `${baseURL}/translations`;

  const input = {
    used_word: used_word,
    word_id: word_id,
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

const postResetPassword = async (email) => {
  const url = `${baseURL}/password/reset`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => error);

  return resp;
};

const fetchLeaderboard = async () => {
  const url = `${baseURL}/top`;

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => data);

  return resp;
};

export {
  fetchLogin,
  fetchSignup,
  fetchSession,
  fetchTranslations,
  fetchCreateTranslation,
  fetchWords,
  postResetPassword,
  testResetPasswordToken,
  fetchChangePassword,
  fetchLeaderboard,
};
