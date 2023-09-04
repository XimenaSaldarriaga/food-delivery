import React, { useState } from 'react';
import search from '../../assets/SearchGray.png';
import './search.scss';
import Footer from '../footer/Footer';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom'; 

const Search = () => {
  const { fetchAllMenus } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const allMenus = await fetchAllMenus();
      const matchingDishes = [];

      allMenus.forEach(({ restaurantId, menuData }) => {
        const matchingDishesInMenu = menuData.map(dish => ({
          ...dish,
          restaurantId: restaurantId,
        })).filter(dish =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        matchingDishes.push(...matchingDishesInMenu);
      });

      setSearchResults(matchingDishes);
    } catch (error) {
      console.error('Error searching for dishes:', error);
    }
  };

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    handleSearch();
  };

  const handleDishClick = (dish) => {
    navigate(`/product?restaurantId=${dish.restaurantId}&dishId=${dish.id}`);
  };
  return (
    <div className='search flex flex-col gap-8 my-10 mx-5 text-[14px]'>
      <div className='relative'>
        <input
          className='bg-gray-100 w-full rounded-md px-8 py-2 text-[14px] outline-none'
          type='text'
          placeholder='   Search for a dish'
          value={searchQuery}
          onChange={handleInputChange}
        />
        <img
          src={search}
          alt='Search Icon'
          className='absolute left-2 top-1/2 transform -translate-y-1/2'
        />
      </div>

      {searchResults.map(dish => (
        <div className='flex gap-4 items-center text-[14px]' key={dish.id} onClick={() => handleDishClick(dish)}>
          <img className='w-[100px] rounded-md' src={dish.image} alt='' />
          <div className='flex flex-col'>
            <span className='font-semibold'>{dish.name}</span>
            <span className='text-gray-400'>{dish.restaurantId}</span>
            <span className='text-gray-400'>{dish.price}</span>
            <span className='text-gray-400'>{dish.time}</span>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Search;

