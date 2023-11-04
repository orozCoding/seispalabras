const checkForAccentMark = (guess) => {
  const marks = ['á', 'à', 'é', 'è', 'í', 'ì', 'ó', 'ò', 'ú', 'ù'];
  const bool = marks.some((mark) => guess.includes(mark));
  return bool;
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

const filterCorrectAnswers = (answer, activeWord) => {
  const correctAnswers = [];
  activeWord.s.forEach((word) => {
    let filtered = word;
    if (!checkForAccentMark(answer)) {
      filtered = word.normalize('NFD').replace(/\p{Diacritic}|\s/gu, '');
    }
    filtered = filtered.toLowerCase();
    correctAnswers.push(filtered);
  });
  return correctAnswers;
};

export { checkForAccentMark, filterAnswer, filterCorrectAnswers };
