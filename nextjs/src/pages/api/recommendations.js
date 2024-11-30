// src/pages/api/recommendations.js

import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Define the MySQL connection configuration
  const dbConfig = {
    host: 'localhost', // Use your host (use 'db.relational-data.org' if needed)
    user: 'root', // Replace with your username
    password: '1100339352', // Replace with your password
    database: 'imdb', // Replace with your database name
  };

  if (req.method === 'POST') {
    const { mood } = req.body;

    const moodToGenre = {
      Curious: 'Documentary',
      "Briefly Engaging": 'Short',
      Lighthearted: 'Comedy',
      Tense: 'Crime',
      Rugged: 'Western',
      Heartwarming: 'Family',
      Imaginative: 'Animation',
      Intense: 'Drama',
      Affectionate: 'Romance',
      Intrigued: 'Mystery',
      Edgy: 'Thriller',
      Provocative: 'Adult',
      Rhythmic: 'Music',
      Excited: 'Action',
      Wondrous: 'Fantasy',
      Futuristic: 'Sci-Fi',
      Fearful: 'Horror',
      Solemn: 'War',
      Upbeat: 'Musical',
      Adventurous: 'Adventure',
      Moody: 'Film-Noir',
    };

    const genre = moodToGenre[mood];

    if (!genre) {
      return res.status(400).json({ error: 'Invalid mood provided' });
    }

    // Create a query to find movie recommendations based on mood
    const query = `
      SELECT COUNT(*), d.first_name AS director_fn, d.last_name AS director_ln,
      a.first_name AS actor_fn, a.last_name AS actor_ln, mg.genre
      FROM movies m
      JOIN movies_genres mg ON mg.movie_id = m.id
      JOIN movies_directors md ON md.movie_id = m.id
      JOIN directors d ON d.id = md.director_id
      JOIN roles r ON r.movie_id = m.id
      JOIN actors a ON a.id = r.actor_id
      WHERE mg.genre = ? AND m.rank > 8
      GROUP BY d.first_name, d.last_name, a.first_name, a.last_name, mg.genre
      ORDER BY COUNT(*) DESC
      LIMIT 10
    `;

    try {
      // Connect to the MySQL database
      const connection = await mysql.createConnection(dbConfig);

      // Execute the query
      const [results] = await connection.execute(query, [genre]);

      // Close the connection
      await connection.end();

      // Return the results
      res.status(200).json(results);
    } catch (error) {
      console.error('Database query failed: ', error);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
