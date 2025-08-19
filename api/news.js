// /api/news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_API_KEY; // securely hidden in Vercel environment
  const leagueId = 39; // Premier League
  const season = 2025; // current season

  const url = `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'v3.football.api-sports.io'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `API response status: ${response.status}` });
    }

    const data = await response.json();
    const fixtures = data.response || [];

    if (fixtures.length === 0) {
      return res.status(200).json({ fixtures: [], message: 'No Premier League fixtures available.' });
    }

    // Simplify fixture data for frontend
    const simplified = fixtures.map(f => ({
      date: f.fixture.date,
      home: f.teams.home.name,
      away: f.teams.away.name,
      status: f.fixture.status.short,
      score: f.score.fulltime
    }));

    res.status(200).json({ fixtures: simplified });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching fixtures.' });
  }
}

