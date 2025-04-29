document.addEventListener('DOMContentLoaded', () => {
    fetch('/leaderboard')
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#leaderboardTable tbody');
        data.forEach((entry, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.username}</td>
            <td>${entry.score}</td>
          `;
          tbody.appendChild(row);
        });
      });
  });
  