// /api/news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_API_KEY; // hide the key in environment variables
  const leagueId = '39'; // Premier League ID
  const url = `https://api.football-data.org/v4/competitions/${leagueId}/matches`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': apiKey }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // return only the fixtures array
    res.status(200).json({ fixtures: data.matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ fixtures: [], error: 'Error loading fixtures.' });
  }
}
