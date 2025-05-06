import React, { useState, useEffect } from 'react';

const NumberInput = ({ onQuantityChange , quantityDefault}) => {
  const [quantity, setQuantity] = useState(quantityDefault); // Estado inicial con valor 1

  useEffect(() => {
    onQuantityChange(quantity); // Llama a la función cuando la cantidad cambia
  }, [quantity, onQuantityChange]); // Agregamos onQuantityChange para prevenir problemas de dependencia

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Incrementar la cantidad
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrementar la cantidad, no permitir menos de 1
  };

  const handleChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value)); // Asegurarse de que el valor sea al menos 1
    setQuantity(value);
  };

  return (
    <div>
      <button className='bg-secondary hover:bg-secondary-accent w-fit px-2 rounded-md 
  font-semibold mb-3' onClick={handleDecrement}>-</button>
      <input
      className='outline-none border-2 border-gray-400 focus:border-secondary rounded-md'
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1" // Para evitar que se introduzcan números negativos
        style={{ width: '50px', textAlign: 'center' }}
      />
      <button className='bg-secondary hover:bg-secondary-accent w-fit px-2 rounded-md text-white
  font-semibold mb-3' onClick={handleIncrement}>+</button>
    </div>
  );
};

export default NumberInput;