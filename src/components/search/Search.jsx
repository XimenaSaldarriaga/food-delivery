import React from 'react';
import search from '../../assets/SearchGray.png';
import recent from '../../assets/recent.png';

const Search = () => {
  return (
    <div className='flex flex-col gap-4 my-10 mx-5'>
      <div className='relative'>
        <input
          className='bg-gray-100 w-full rounded-md px-5 py-2 text-[14px]'
          type="text"
          placeholder='   Search for a dish'
        />
        <img
          src={search}
          alt='Search Icon'
          className='absolute left-2 top-1/2 transform -translate-y-1/2'
        />
      </div>
      <p className='text-[14px]'>Recent searches</p>

      <div className='flex gap-2 items-center'>
        <img className='object-contain' src={recent} alt="" />
        <span className='text-[14px] text-gray-400'>Pizza</span>
      </div>
    </div>
  );
}

export default Search;
