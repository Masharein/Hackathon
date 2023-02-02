const usernameInput = document.querySelector('#username');
const saveBtn = document.querySelector('#saveScoreBtn');
const scoreDisplay = document.querySelector('#finalScore');

const scores = JSON.parse(localStorage.getItem('highScores')) || [];
const maxScores = 5;

scoreDisplay.innerText = localStorage.getItem('mostRecentScore');

usernameInput.addEventListener('input', () => {
  saveBtn.disabled = !usernameInput.value;
});

saveBtn.addEventListener('click', event => {
  event.preventDefault();
  
  const newScore = {
    name: usernameInput.value,
    score: localStorage.getItem('mostRecentScore')
  };

  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  scores.splice(maxScores);

  localStorage.setItem('highScores', JSON.stringify(scores));
  window.location.assign('highscores.html');
});
