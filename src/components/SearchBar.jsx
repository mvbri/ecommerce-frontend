import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        className="mr-2 px-2 py-1 outline-none border-2 border-gray-400 focus:border-secondary rounded-md"
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:stroke-secondary transition duration-100 ease-in-out"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
