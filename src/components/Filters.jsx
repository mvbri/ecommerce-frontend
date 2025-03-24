import "./css/Filters.css";
import { useFilter } from "../hooks/useFilter";

const Filters = () => {
  const { filters, setFilters } = useFilter();

  const handleChangeMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };

  const handleChangeCategory = (e) => {
    console.log(e.target.value);
    setFilters((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor="price">Precio a partir de:</label>
        <input
          onChange={handleChangeMinPrice}
          type="range"
          id="price"
          min="0"
          max="1000"
          value={filters.minPrice}
        />
        <span>{filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor="category">Categoria</label>
        <select id="category" onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="postres">postres</option>
          <option value="comida rapida">Comida rapida</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
