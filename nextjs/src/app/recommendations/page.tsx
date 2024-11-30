"use client";

import React, { useState } from "react";
import Dropdown from "../../components/dropdown"; // Dropdown component to select mood

export default function RecommendationPage() {
  const [step, setStep] = useState(1); // To keep track of the current step
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watchedMovie, setWatchedMovie] = useState("");

  // Function to handle the mood selection and genre mapping
  const handleDropdownChange = (selectedMood) => {
    setMood(selectedMood);

    const moodGenreMap = {
      Curious: "Documentary",
      "Briefly Engaging": "Short",
      Lighthearted: "Comedy",
      Tense: "Crime",
      Rugged: "Western",
      Heartwarming: "Family",
      Imaginative: "Animation",
      Intense: "Drama",
      Affectionate: "Romance",
      Intrigued: "Mystery",
      Edgy: "Thriller",
      Provocative: "Adult",
      Rhythmic: "Music",
      Excited: "Action",
      Wonderous: "Fantasy",
      Futuristic: "Sci-Fi",
      Fearful: "Horror",
      Solemn: "War",
      Upbeat: "Musical",
      Adventurous: "Adventure",
      Moody: "Film-Noir",
    };

    const selectedGenre = moodGenreMap[selectedMood];
    setGenre(selectedGenre);

    setStep(2); // Proceed to the next step
  };

  // Function to get director/actor combinations based on the genre
  const handleGetDirectorCombinations = async () => {
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genre }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      setDirectors(data);
      setStep(3); // Proceed to the next step
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get top-rated and lowest-rated films by the selected director
  const handleSelectDirector = async (director) => {
    setSelectedDirector(director);
    try {
      const response = await fetch("/api/director-films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ director }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch films");
      }
      const data = await response.json();
      setMovies(data);
      setStep(4); // Proceed to the next step
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get similar movies
  const handleGetSimilarMovies = async () => {
    try {
      const response = await fetch("/api/similar-movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ watchedMovie }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch similar movies");
      }
      const data = await response.json();
      setMovies(data);
      setStep(5); // Proceed to the next step
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Movie Information and Recommendation System</h1>

      {step === 1 && (
        <div>
          <p>Hello! Welcome to the movie information and recommendation system, what is your mood?</p>
          <Dropdown onSelect={handleDropdownChange} />
        </div>
      )}

      {step === 2 && (
        <div>
          <p>
            That's a great choice! Here are some of the best director/actor combinations based on the mood/genre that
            interests you.
          </p>
          <button onClick={handleGetDirectorCombinations}>Get Recommendations</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>What Directors/actors do you recognize? Do any of them interest you? Let me know the name of the Director.</p>
          {directors.map((director, index) => (
            <div key={index} onClick={() => handleSelectDirector(director)}>
              <p>
                Director: {director.director_fn} {director.director_ln}, Actor: {director.actor_fn} {director.actor_ln}, Genre:{" "}
                {director.genre}
              </p>
            </div>
          ))}
        </div>
      )}

      {step === 4 && (
        <div>
          <p>Here are the top 3 best and worst rated films by the selected director:</p>
          {movies.map((movie, index) => (
            <div key={index}>
              <h3>{movie.movie_name}</h3>
              <p>Rank: {movie.ranked}</p>
            </div>
          ))}
          <p>Once you pick and finish watching a movie, let me know how you liked it!</p>
          <input
            type="text"
            placeholder="Movie name"
            value={watchedMovie}
            onChange={(e) => setWatchedMovie(e.target.value)}
          />
          <button onClick={handleGetSimilarMovies}>Get Similar Movies</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <p>Here are similar movies by the same director that are highly ranked!</p>
          {movies.map((movie, index) => (
            <div key={index}>
              <h3>{movie.movie_name}</h3>
              <p>Rank: {movie.ranked}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
