import React from "react";
import Link from "next/link"; 
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["landing-home"]}>
  <div className={styles["film-header"]}>
    <Image className={styles["film"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
    <Image className={styles["img"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
    <Image className={styles["film-2"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
  </div>
  <p className={styles["text-wrapper"]}>
    Compare directors, genres and rankings. Get movie recommendations while
    learning about the people behind the scenes!
  </p>
  <div className={styles["overlap-group"]}>
    <div className={styles["div"]}>Try our</div>
    <p className={styles["want-to-dig-deep"]}>
      Want to dig deep into
      <br />
      the world of film?
    </p>
    <Link href="/welcomePage">
      <div className={styles["text-wrapper-2"]}>ChatBot!</div>
    </Link>
  </div>
  <div className={styles["film-footer"]}>
    <Image className={styles["film"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
    <Image className={styles["img"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
    <Image className={styles["film-2"]} alt="Film" src="/images/film.jpeg" width={500} height={500} />
  </div>
</div>

  );
}

