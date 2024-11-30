"use client";

import React, { useState } from "react";
import styles from "./dropdown.module.css";

interface DropdownProps {
  className?: string;
  onSelect: (selectedMood: string) => void; // New prop for passing the selected mood to parent component
}

export const Dropdown: React.FC<DropdownProps> = ({ className, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const optionItems = [
    "Curious",
    "Briefly Engaging",
    "Lighthearted",
    "Tense",
    "Rugged",
    "Heartwarming",
    "Imaginative",
    "Affectionate",
    "Intrigued",
    "Edgy",
    "Provocative",
    "Rhythmic",
    "Excited",
    "Wondrous",
    "Futuristic",
    "Fearful",
    "Solemn",
    "Upbeat",
    "Adventurous",
    "Moody",
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item); // Pass the selected mood to the parent component
  };

  return (
    <div className={`${styles.dropdown} ${className || ""}`}>
      <button className={styles.button} onClick={handleToggleDropdown}>
        <span className={styles.label}>
          {selectedItem ? selectedItem : "I'm feeling..."}
        </span>
        <span className={styles.arrow}>
          {isOpen ? "▲" : "▼"} {/* Show different arrows depending on dropdown state */}
        </span>
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {optionItems.map((item) => (
            <li
              key={item}
              className={styles.item}
              onClick={() => handleSelectItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
