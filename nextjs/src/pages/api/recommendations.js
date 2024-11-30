import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { queryType, mood, director, movie } = req.body;

  // Database configuration
  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "1100339352", // Replace with your password
    database: "imdb_ijs",
  };

  try {
    // Create a database connection
    const connection = await mysql.createConnection(dbConfig);

    let results;

    switch (queryType) {
      case "getDirectorActorCombinations": {
        // Mapping moods to genres
        const moodToGenre = {
          "Curious": "Documentary",
          "Briefly Engaging": "Short",
          "Lighthearted": "Comedy",
          "Tense": "Crime",
          "Rugged": "Western",
          "Heartwarming": "Family",
          "Imaginative": "Animation",
          "Intense": "Drama",
          "Affectionate": "Romance",
          "Intrigued": "Mystery",
          "Edgy": "Thriller",
          "Provocative": "Adult",
          "Rhythmic": "Music",
          "Excited": "Action",
          "Wondrous": "Fantasy",
          "Futuristic": "Sci-Fi",
          "Fearful": "Horror",
          "Solemn": "War",
          "Upbeat": "Musical",
          "Adventurous": "Adventure",
          "Moody": "Film-Noir",
        };

        // Convert mood to genre
        const genre = moodToGenre[mood];
        if (!genre) {
          return res.status(400).json({ message: "Invalid mood selected" });
        }

        // Query to fetch top director/actor combinations based on genre
        const query = `
          SELECT m.name AS movie_name, d.first_name AS director_fn, d.last_name AS director_ln, a.first_name AS actor_fn, a.last_name AS actor_ln, mg.genre 
          FROM movies m
          JOIN movies_genres mg ON mg.movie_id = m.id
          JOIN movies_directors md ON md.movie_id = m.id
          JOIN directors d ON d.id = md.director_id
          JOIN roles r ON r.movie_id = m.id
          JOIN actors a ON a.id = r.actor_id
          WHERE mg.genre = ?
          ORDER BY m.rank DESC
          LIMIT 10
        `;

        [results] = await connection.execute(query, [genre]);
        break;
      }

      case "getDirectorMovies": {
        const { firstName, lastName } = director;

        if (!firstName || !lastName) {
          return res.status(400).json({ message: "Director's name is required" });
        }

        // Query to get the top 3 best and worst movies of a director
        const query = `
          (
            SELECT DISTINCT m.name AS movie_name, d.first_name AS director_fn, d.last_name AS director_ln, m.rank AS ranked
            FROM movies m
            JOIN movies_directors md ON md.movie_id = m.id
            JOIN directors d ON d.id = md.director_id
            WHERE m.rank > 5 AND d.first_name = ? AND d.last_name = ?
            ORDER BY m.rank DESC
            LIMIT 3
          )
          UNION ALL
          (
            SELECT DISTINCT m.name AS movie_name, d.first_name AS director_fn, d.last_name AS director_ln, m.rank AS ranked
            FROM movies m
            JOIN movies_directors md ON md.movie_id = m.id
            JOIN directors d ON d.id = md.director_id
            WHERE m.rank < 5 AND d.first_name = ? AND d.last_name = ?
            ORDER BY m.rank DESC
            LIMIT 3
          )
        `;

        [results] = await connection.execute(query, [firstName, lastName, firstName, lastName]);
        break;
      }

      case "getSimilarMovies": {
        if (!movie) {
          return res.status(400).json({ message: "Movie name is required" });
        }

        // Query to find similar movies by the same director
        const query = `
          SELECT DISTINCT m.name AS movie_name, d.first_name AS director_fn, d.last_name AS director_ln, m.rank AS ranked
          FROM movies m
          JOIN movies_directors md ON md.movie_id = m.id
          JOIN directors d ON d.id = md.director_id
          JOIN actors a ON a.id = (
            SELECT actor_id FROM roles WHERE movie_id = (
              SELECT id FROM movies WHERE name = ? LIMIT 1
            ) LIMIT 1
          )
          JOIN roles r ON r.actor_id = a.id AND r.movie_id = m.id
          WHERE m.rank > 3 AND d.id = (
            SELECT director_id FROM movies_directors WHERE movie_id = (
              SELECT id FROM movies WHERE name = ? LIMIT 1
            )
          )
          ORDER BY m.rank DESC
          LIMIT 10
        `;

        [results] = await connection.execute(query, [movie, movie]);
        break;
      }

      default:
        return res.status(400).json({ message: "Invalid query type" });
    }

    // Close the connection
    await connection.end();

    // Return the query results
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
}
