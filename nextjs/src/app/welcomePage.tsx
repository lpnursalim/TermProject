import React from "react";
import styles from "./welcomePage.module.css"; // Import styles from CSS Modules
import { Dropdown } from "./components/dropdown"; // Import the Dropdown component
import Image from "next/image";

export default function ChatBot() {
  return (
    <div className={styles["chat-bot"]}>
      <p className={styles["text-wrapper"]}>
        Hello! Wanna know more about a movie or just looking to find a new one?
        What’s your mood?
      </p>
      <Dropdown />
      <div className={styles["div"]}>Welcome to Movie ChatBot</div>
      <div className={styles["film-footer"]}>
        <Image className={styles["film"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
        <Image className={styles["img"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
        <Image className={styles["film-2"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
      </div>
      <div className={styles["film-header"]}>
        <Image className={styles["film-3"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
        <Image className={styles["film-4"]} alt="Film" src="/images/film.