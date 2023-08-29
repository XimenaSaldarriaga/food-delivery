import React from 'react';
import search from '../../assets/SearchGray.png';
import './search.scss'
import Footer from '../footer/Footer';

const Search = () => {
  return (
    <div className='search flex flex-col gap-8 my-10 mx-5 text-[14px]'>
      <div className='relative'>
        <input
          className='bg-gray-100 w-full rounded-md px-5 py-2 text-[14px] outline-none'
          type="text"
          placeholder='   Search for a dish'
        />
        <img
          src={search}
          alt='Search Icon'
          className='absolute left-2 top-1/2 transform -translate-y-1/2'
        />
      </div>

      <div className='flex gap-4 items-center'>
        <img className='w-12 rounded-md' src="https://inquiringchef.com/wp-content/uploads/2020/05/Greek-Pizza_square.jpg" alt="" />
        <div className='flex flex-col gap-1'>
          <span className='font-semibold'>Meat pizza</span>
          <span className='text-gray-400'>$ 29.00</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Search;
