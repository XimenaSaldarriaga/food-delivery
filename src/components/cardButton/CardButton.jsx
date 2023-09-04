import React  from 'react';
import { useNavigate } from 'react-router-dom';

const CardButton = () => {
  const storedCurrentOrder = JSON.parse(localStorage.getItem('currentOrder')) || {};

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/current');
  };

  return (
    <button
      onClick={handleClick}
      className='bg-yellow-300 py-3 px-6 rounded-md flex justify-between text-[12px] items-center cursor-pointer fixed w-[94%] bottom-16 self-center'
    >
      <span className='text-[10px] text-white px-1 rounded-[2px] bg-slate-600'>
        {storedCurrentOrder.quantity || 0}
      </span>
      <span className='font-semibold text-[14px]'>View card</span>
      <span>$ {storedCurrentOrder.totalCost || 0}</span>
    </button>
  );
};

export default CardButton;