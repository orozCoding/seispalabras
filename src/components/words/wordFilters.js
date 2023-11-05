const checkForAccentMark = (answer) => {
  const marks = ["á", "é", "í", "ó", "ú", "ñ"];
  return marks.some((mark) => answer.includes(mark));
};

const filterAnswer = (answer) => {
  if (checkForAccentMark(answer)) {
    return answer.toLowerCase().replace(/\s/gu, "");
  }
  const filtered = answer
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}|\s/gu, "");
  return filtered;
};

const removeAccentMarks = (word) => {
  return word.normalize("NFD").replace(/\p{Diacritic}|\s/gu, "");
};

// the idea is to see if the user input is correct for the English word.
// we want to be flexible with accent marks, so we first check if the user
// got it right with accent mark. If not, check if removing the accent mark
// from the "correct possible words" finds a match. Meaning that the user
// guessed correctly, but without the accent mark.
// In that case, we want to return the correct answer with the accent mark,
// so we send the correct answer to the backend.
const findCorrectAnswer = (answer, wordObject) => {
  // first remove any space and downcase the answer
  const cleanAnswer = answer.toLowerCase().replace(/\s/gu, "");

  const possibleWords = wordObject.s;
  let correctWord = possibleWords.find((word) => word === cleanAnswer);

  if (correctWord) return correctWord;

  correctWord = possibleWords.find((word) => removeAccentMarks(word) === cleanAnswer);

  return correctWord;
};

const filterCorrectAnswers = (answer, activeWord) => {
  const correctAnswers = [];
  activeWord.s.forEach((word) => {
    let filtered = word;
    if (!checkForAccentMark(answer)) {
      filtered = word.normalize("NFD").replace(/\p{Diacritic}|\s/gu, "");
    }
    filtered = filtered.toLowerCase();
    correctAnswers.push(filtered);
  });
  return correctAnswers;
};

export { checkForAccentMark, filterAnswer, filterCorrectAnswers, findCorrectAnswer };
