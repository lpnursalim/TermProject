import React from "react";
import { useRouter } from "next/router"; // Import useRouter hook
import Link from "next/link"; // Import Link component from Next.js
import filmImage from "../public/images/film.jpeg"; // Single image import
import styles from "./page.module.css"

export const Home = ({ className }) => {
  return (
    <div className={`landing-home ${className}`}>
      <div className="film-footer">
        <img className="film" alt="Film" src={filmImage} />
        <img className="img" alt="Film" src={filmImage} />
        <img className="film-2" alt="Film" src={filmImage} />
      </div>
      <div className="film-header">
        <img className="film" alt="Film" src={filmImage} />
        <img className="img" alt="Film" src={filmImage} />
        <img className="film-2" alt="Film" src={filmImage} />
      </div>
      <p className="text-wrapper">
        Compare directors, genres and rankings. Get movie recommendations while
        learning about the people behind the scenes!
      </p>
      <div className="overlap-group">
        <div className="div">Try our</div>
        <p className="want-to-dig-deep">
          Want to dig deep into
          <br />
          the world of film?
        </p>
        <Link href="/welcomePage">
          <div className="text-wrapper-2">ChatBot!</div>
        </Link>
      </div>
    </div>
  );
};
