import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import location from '../../assets/Location.png';
import arrow from '../../assets/Arrow.png';
import hamburger from '../../assets/hamburger.png';
import pizza from '../../assets/pizza.png';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import './home.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { FirebaseError } from 'firebase/app';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';


const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const { user } = useAuth();
  console.log(user);

  const taskState = useSelector(state => state.tasks);
  console.log(taskState);


  useEffect(() => {
    const db = getFirestore(FirebaseError);
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(db, "restaurants");
        const querySnapshot = await getDocs(restaurantsCollection);
        const restaurantData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        setRestaurants(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);


  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='home flex flex-col gap-5 m-4 mb-20'>
      <div className='flex gap-2'>
        <div><img src={location} alt="" /></div>
        <div>
          <p className='text-yellow-300 text-[10px] '>DELIVER TO</p>
          <p className='flex gap-1 text-[14px] font-bold'>882 Well St, New-York <img className='object-contain' src={arrow} alt="" /></p>
        </div>
      </div>
      <br />
      <div className="carousel-container">
        <Slider {...settings} className="carousel mx-auto">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className='carousel-slide'
              onClick={() => {
                handleRestaurantClick(restaurant.id);
              }}
            >
              <img
                className="carousel-image"
                src={restaurant.image}
                alt={restaurant.name}
              />
            </div>
          ))}
        </Slider>
      </div>
      <br />
      <p className='text-[14px]'>Restaurants and cafes</p>
      <div className='flex gap-5'>
        <button
          className={`py-2 w-[150px] rounded-md text-[10px] ${selectedCategory === 'All' ? 'bg-yellow-300' : 'bg-gray-100'
            }`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        <button
          className={`flex items-center justify-center gap-3 w-[150px] rounded-md text-[10px] ${selectedCategory === 'Fast Food' ? 'bg-yellow-300' : 'bg-gray-100'
            }`}
          onClick={() => setSelectedCategory('Fast Food')}
        >
          <img src={hamburger} alt="Fast Food" />
          <span>Fast Food</span>
        </button>
        <button
          className={`flex items-center justify-center gap-3 w-[150px] rounded-md text-[10px] ${selectedCategory === 'Pizza' ? 'bg-yellow-300' : 'bg-gray-100'
            }`}
          onClick={() => setSelectedCategory('Pizza')}
        >
          <img src={pizza} alt="Pizza" />
          <span>Pizza</span>
        </button>
      </div>

      <div className='flex gap-5 menuContainer' >
        {restaurants.map((restaurant, index) => {
          if (
            selectedCategory === 'All' ||
            (restaurant.categories && restaurant.categories.includes(selectedCategory))
          ) {
            return (
              <div
                key={index}
                className='flex gap-5 items-center'
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <img className='rounded-md w-[130px]' src={restaurant.poster} alt={restaurant.name} />

                <div>
                  <p className='text-[14px] font-bold'>{restaurant.name}</p>
                  <div className="star">
                    {Array.from({ length: 5 }).map((_, starIndex) => {
                      const starFraction = restaurant.rating - starIndex;
                      let starClass = "star-icon-empty";

                      if (starFraction >= 0.5) {
                        starClass = "star-icon-filled";
                      } else if (starFraction > 0) {
                        starClass = "star-icon-half-filled";
                      }

                      return (
                        <span key={starIndex} className="star-icon">
                          <FaStar className={starClass} />
                        </span>
                      );
                    })}
                  </div>

                  <p className='text-[14px]'> Work time: <span className='text-[10px]'>{restaurant.workTime}</span></p>
                  <p className='text-[10px]'>Before you {restaurant.price}$</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;


