import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";

const SearchResult = ({ results }) => {
  if (results.length > 0) {
    return (
      <div className="search-results">
        <BasicGridLayout>
        {results.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </BasicGridLayout>
      </div>
    );
  }
  return null;
};

export default SearchResult;
