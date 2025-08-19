export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.football-data.org/v3/fixtures?league=39&season=2025',
      {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_API_KEY
        }
      }
    );

    console.log('API response status:', response.status);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error loading fixtures.' });
  }
}
