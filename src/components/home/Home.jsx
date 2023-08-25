import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import location from '../../assets/Location.png';
import arrow from '../../assets/Arrow.png';
import home from '../../assets/Home.png';
import search from '../../assets/Search.png';
import orders from '../../assets/Orders.png';
import profile from '../../assets/Profile.png';
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

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
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
        const restaurantData = querySnapshot.docs.map((doc) => doc.data());
        setRestaurants(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='home flex flex-col gap-5 m-4'>
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
            <div key={index} className='carousel-slide'>
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
        <button className='bg-yellow-300 py-2 w-[150px] rounded-md text-[10px]'>All</button>
        <button className='flex items-center justify-center gap-3 bg-gray-100 w-[150px] rounded-md text-[10px] '>
          <img src={hamburger} alt="Pizza" />
          <span>Fast Food</span>
        </button>
        <button className='flex items-center justify-center gap-3 bg-gray-100 w-[150px] rounded-md text-[10px]'>
          <img src={pizza} alt="Pizza" />
          <span>Pizza</span>
        </button>
      </div>

      <div className='flex gap-5 items-center menuContainer' >
        {restaurants.map((restaurant, index) => (
          <div key={index} className='flex gap-5 items-center'>
            <img className='rounded-md w-[130px]' src={restaurant.poster} alt={restaurant.name} />

            <div>
              <p className='text-[14px] font-bold'>{restaurant.name}</p>
              <div className="stars">
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

              <p className='text-[14px]'> Work time: {restaurant.workTime}</p>
              <p className='text-[10px]'>Before you {restaurant.price}$</p>
            </div>
          </div>
        ))}

      </div>

      <div className='flex justify-between fixed bottom-0 left-0 p-4 w-full'>
        <img className='object-contain' src={home} alt="" />
        <img className='object-contain' src={search} alt="" />
        <img className='object-contain' src={orders} alt="" />
        <img className='object-contain' src={profile} alt="" />
      </div>
    </div>
  );
}

export default Home;


