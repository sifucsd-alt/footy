export default async function handler(req, res) {
  const apiKey = process.env.NEWS_API_KEY; // secure
  const url = `https://newsapi.org/v2/everything?q=Premier%20League&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(500).json({ error: "Failed to fetch news" });
    }

    res.status(200).json({ articles: data.articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching news" });
  }
}
