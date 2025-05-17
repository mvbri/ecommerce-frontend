import { useState, useEffect } from "react";

const NumberInput = ({ onQuantityChange, quantityDefault }) => {
  const [quantity, setQuantity] = useState(quantityDefault); // Estado inicial con valor 1

  useEffect(() => {
    onQuantityChange(quantity); // Llama a la función cuando la cantidad cambia
  }, [quantity, onQuantityChange]); // Agregamos onQuantityChange para prevenir problemas de dependencia

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Incrementar la cantidad
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrementar la cantidad, no permitir menos de 1
  };

  const handleChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value)); // Asegurarse de que el valor sea al menos 1
    setQuantity(value);
  };

  return (
    <div className="relative flex items-center max-w-[8rem] mb-2">
      <button
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        onClick={handleDecrement}
      >
        <svg
          className="w-2 h-2 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        className="bg-gray-50 border-y text-center w-[2rem] border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1" // Para evitar que se introduzcan números negativos
      />
      <button
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-8 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        onClick={handleIncrement}
      >
        <svg
          className="w-2 h-2 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default NumberInput;
