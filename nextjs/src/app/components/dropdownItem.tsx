import React from "react";
import styles from "./dropdown.module.css";

// Define the props for DropdownOptionItem
interface DropdownOptionItemProps {
  text: string;
  className?: string;
}

export const DropdownOptionItem: React.FC<DropdownOptionItemProps> = ({ text, className }) => {
  return (
    <div className={`${styles["dropdown-option-item-instance"]} ${className}`}>
      {text}
    </div>
  );
};
