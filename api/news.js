export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY; // hidden in environment
  const LEAGUE_ID = 39; // Premier League
  const NEXT_FIXTURES = 10;

  try {
    const response = await fetch(`https://api.football-data.org/v4/competitions/${LEAGUE_ID}/matches?status=SCHEDULED&limit=${NEXT_FIXTURES}`, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching fixtures' });
    }

    const data = await response.json();
    res.status(200).json({ fixtures: data.matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
