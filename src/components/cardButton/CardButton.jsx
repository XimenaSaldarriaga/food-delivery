
import React from 'react';

const CardButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='bg-yellow-300 py-3 px-6 rounded-md flex justify-between text-[12px] items-center cursor-pointer fixed w-[94%] bottom-16 self-center'>
      <span className='text-[10px] text-white px-1 rounded-[2px] bg-slate-600'>4</span>
      <span className='font-semibold text-[14px]'>View card</span>
      <span>64.00 $</span>
    </button>
  );
}

export default CardButton;
