const checkForAccentMark = (guess) => {
  const marks = ['á', 'à', 'é', 'è', 'í', 'ì', 'ó', 'ò', 'ú', 'ù'];
  const bool = marks.some((mark) => guess.includes(mark));
  return bool;
};

const filterGuess = (answer) => {
  if (checkForAccentMark(answer)) {
    return answer.toLowerCase();
  }
  let filtered = answer.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return filtered;
}

const filterCorrectAnswers = (answer, activeWord) => {
  let correctAnswers = [];
  activeWord.s.forEach((word) => {
    if (!checkForAccentMark(answer)) {
      word = word.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    };
    word = word.toLowerCase();
    correctAnswers.push(word);
  })
  return correctAnswers;
}

export { checkForAccentMark, filterGuess, filterCorrectAnswers };