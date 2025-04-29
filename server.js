const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

 app.get('/questions', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json({ questions: data.questions });
});

 app.post('/submit-score', (req, res) => {
  const { username, score } = req.body;
  const filePath = path.join(__dirname, 'data.json');

  const data = JSON.parse(fs.readFileSync(filePath));
  if (!data.results) data.results = [];

  data.results.push({ username, score });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.send({ status: "success" });
});
// Get leaderboard data
app.get('/leaderboard', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json'));
    const results = data.results || [];
  
    // Sort scores descending
    const sorted = results.sort((a, b) => b.score - a.score);
    res.json(sorted);
  });
  
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
