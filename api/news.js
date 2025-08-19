// /api/news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY || 'fabde55d857118255d4fd0cd39f47b4b'; // fallback if env not set

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=39&season=2025&timezone=Europe/London`,
      {
        headers: {
          'x-apisports-key': API_KEY
        }
      }
    );

    const data = await response.json();

    if (!data.response || data.response.length === 0) {
      return res.status(200).json({ fixtures: [] });
    }

    res.status(200).json({ fixtures: data.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching football news' });
  }
}
