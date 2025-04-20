import ProductItem from "./ProductItem";

const SearchResult = ({ results }) => {
  if (results.length > 0) {
    return (
      <div className="search-results">
        {results.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    );
  }
  return null;
};

export default SearchResult;
