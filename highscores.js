const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML = 
highScores.map(score => { return `< class='high-score'>${score.name} - ${score.score}</li>`}).join('')