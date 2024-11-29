import React from "react";
import filmImage from "../public/images/film.jpeg"; // Import the single film image from the public folder
import styles from "./welcomePage.module.css"; // Import styles from CSS Modules
import { Dropdown } from "./components/dropdown";
import Image from "next/image";

export const ChatBot = () => {
  return (
    <div className={styles["chat-bot"]}>
      <p className={styles["text-wrapper"]}>
        Hello! Wanna know more about a movie or just looking to find a new one?
        What’s your mood?
      </p>
      <Dropdown />
      <div className={styles["div"]}>Welcome to Movie ChatBot</div>
      <div className={styles["film-footer"]}>
        <Image className={styles["film"]} alt="Film" src={filmImage} />
        <Image className={styles["img"]} alt="Film" src={filmImage} />
        <Image className={styles["film-2"]} alt="Film" src={filmImage} />
      </div>
      <div className={styles["film-header"]}>
        <Image className={styles["film-3"]} alt="Film" src={filmImage} />
        <Image className={styles["film-4"]} alt="Film" src={filmImage} />
        <Image className={styles["film-5"]} alt="Film" src={filmImage} />
      </div>
    </div>
  );
};
