"use client";

import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import styles from "./welcomePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [mood, setMood] = useState<string | null>(null);
  const router = useRouter();

  // Function to handle the change in the dropdown selection
  const handleDropdownChange = (selectedMood: string) => {
    setMood(selectedMood);

    // Add navigation or further logic here
    // For example, navigate to a recommendation page after selecting a mood
    if (selectedMood) {
      router.push(`/recommendation?mood=${selectedMood}`);
    }
  };

  return (
    <div className={styles["chat-bot"]}>
      {/* Filmstrip at the top */}
      <div className={styles["film-header"]}>
        <Image
          src="/images/film.jpeg" // Correct path to the image
          alt="Film Strip"
          className={styles["film-strip"]}
          width={1920} // Specify a width
          height={100} // Specify a height
        />
      </div>

      {/* Content */}
      <div className={styles["content"]}>
        <h1 className={styles["title"]}>Welcome to Movie ChatBot</h1>
        <p className={styles["subtext"]}>
          Hello! Wanna know more about a movie or just looking to find a new one? What’s your mood?
        </p>
        {/* Dropdown to select the mood */}
        <Dropdown onSelect={handleDropdownChange} />
      </div>

      {/* Filmstrip at the bottom */}
      <div className={styles["film-footer"]}>
        <Image
          src="/images/film.jpeg" // Correct path to the image
          alt="Film Strip"
          className={styles["film-strip"]}
          width={1920} // Specify a width
          height={100} // Specify a height
        />
      </div>
    </div>
  );
}
