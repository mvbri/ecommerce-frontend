import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = searchParams.get("q");
    setSearchTerm(params);
  }, [searchParams]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/busqueda?q=${searchTerm}`);
  };

  return (
    <div className="relative text-gray-600 w-[18.75rem] mr-4">
      <form
        onSubmit={handleSubmit}
        className={className ? `${className} flex w-full` : " flex w-full"}
      >
        <input
          className="bg-white w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="absolute right-3 top-0 mt-2" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 stroke-secondary hover:stroke-secondary-accent transition duration-100 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
