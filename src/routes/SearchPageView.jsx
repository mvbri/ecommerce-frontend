import { useEffect, useState } from "react";
import SearchResult from "../components/SearchResult";
import HomeLayout from "../layout/HomeLayout";
import { useSearchParams } from "react-router-dom";
import StandardSection from "../components/StandardSection";

const SearchPageView = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("q");

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/search?q=${term}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex flex-col item-center justify-center pt-[7rem]">
          {loading && (
            <p className="text- mb-2">
              Cargando resultados para {`"${searchTerm}"`}...
            </p>
          )}
          {error && (
            <p className="text-center mb-2">
              Hubo un error al buscar {`"${searchTerm}"`}: {error}
            </p>
          )}
          {searchResults.length === 0 ? (
            <h1 className="text-center font-semibold text-xl md:text-4xl">
              No hay resultados para {`"${searchTerm}"`}
            </h1>
          ) : (
            <h1 className="text-center font-semibold text-xl md:text-4xl">
              Resultados de la Búsqueda para {`"${searchTerm}"`}
            </h1>
          )}
        </div>
        <SearchResult results={searchResults} />
      </StandardSection>
    </HomeLayout>
  );
};

export default SearchPageView;
