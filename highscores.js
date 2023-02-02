const highScoresList = document.querySelector('.highScoresList');

let highScores;
try {
  highScores = JSON.parse(localStorage.getItem('highScores')) || [];
} catch (err) {
  console.error(err);
  highScores = [];
}

const renderHighScores = scores => {
  highScoresList.innerHTML = scores
    .map(score => `<li class="high-score">${score.name} => ${score.score}</li>`)
    .join('');
};

renderHighScores(highScores);