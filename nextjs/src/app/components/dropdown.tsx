import React, { useReducer } from "react";
import { DropdownOptionItem } from "./dropdownItem";
import iconDefault from "./icon.svg";
import iconHover from "./image.svg";
import iconOpen from "./icon-2.svg";
import styles from "./dropdown.module.css";

type DropdownState = "default" | "hover" | "open";

interface DropdownProps {
  className?: string;
}

interface DropdownAction {
  type: "MOUSE_ENTER" | "MOUSE_LEAVE" | "CLICK" | "CLOSE";
}

const reducer = (state: DropdownState, action: DropdownAction): DropdownState => {
  switch (state) {
    case "default":
      if (action.type === "MOUSE_ENTER") return "hover";
      break;
    case "hover":
      if (action.type === "MOUSE_LEAVE") return "default";
      if (action.type === "CLICK") return "open";
      break;
    case "open":
      if (action.type === "CLOSE") return "default";
      break;
    default:
      return state;
  }
  return state;
};

export const Dropdown: React.FC<DropdownProps> = ({ className }) => {
  const [state, dispatch] = useReducer(reducer, "default");

  const optionItems = [
    "Curious",
    "Briefly Engaged",
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
    "Wonderous",
    "Futuristic",
    "Fearful",
    "Solemn",
    "Upbeat",
    "Adventurous",
    "Moody",
  ];

  return (
    <div
      className={`${styles.dropdown} ${styles[state]} ${className}`}
      onMouseEnter={() => dispatch({ type: "MOUSE_ENTER" })}
      onMouseLeave={() => dispatch({ type: "MOUSE_LEAVE" })}
    >
      <button
        className={styles.button}
        onClick={() =>
          state === "open"
            ? dispatch({ type: "CLOSE" })
            : dispatch({ type: "CLICK" })
        }
      >
        <span className={styles.label}>I'm feeling...</span>
        <img
          className={styles.icon}
          src={state === "hover" ? iconHover : state === "open" ? iconOpen : iconDefault}
          alt="Dropdown Icon"
        />
      </button>
      {state === "open" && (
        <div className={styles["list-of-items"]}>
          {optionItems.map((item) => (
            <DropdownOptionItem
              key={item}
              className={styles["dropdown-option-item-instance"]}
              text={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;