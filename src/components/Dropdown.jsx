import { useEffect, useRef, useState } from "react";
import "./css/Dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = ({ items, title, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Use mousedown for better UX
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <ul>
      <li
        className={className ? `${className} dropdown` : "dropdown"}
        ref={dropdownRef}
      >
        <button className={`dropdown-toggle`} onClick={toggleDropdown}>
          {title}{" "}
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 pt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 pt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </button>
        <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
          {items.map((item, i) => (
            <Link to={`/${item.slug || item.link}`} key={i}>
              {item.name}
            </Link>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default Dropdown;
