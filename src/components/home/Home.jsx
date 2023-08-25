import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import location from '../../assets/Location.png';
import arrow from '../../assets/Arrow.png';
import today from '../../assets/today.png';
import home from '../../assets/Home.png';
import search from '../../assets/Search.png';
import orders from '../../assets/Orders.png';
import profile from '../../assets/Profile.png';
import hamburger from '../../assets/hamburger.png';
import pizza from '../../assets/pizza.png';
import restaurant1 from '../../assets/restaurant1.png';
import stars from '../../assets/Stars.png';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import './home.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { FirebaseError } from 'firebase/app';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { user } = useAuth();
  console.log(user);

  const taskState = useSelector(state => state.tasks);
  console.log(taskState);

  useEffect(() => {
    // Obtén la instancia de Firestore
    const db = getFirestore(FirebaseError);

    // Crea una función asincrónica para obtener los datos de la colección de restaurantes
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

    fetchRestaurants();  // Llama a la función para obtener los datos al cargar el componente
  }, []);


  return (
    <div className='home flex flex-col gap-5 m-4'>
      <div className='flex gap-2'>
        <div><img src={location} alt="" /></div>
        <div>
          <p className='text-yellow-300 text-[10px] '>DELIVER TO</p>
          <p className='flex gap-1 text-[14px] font-bold'>882 Well St, New-York <img className='object-contain' src={arrow} alt="" /></p>
        </div>
      </div>
      {/* <img className=' rounded-md w-[259px] ' src={today} alt="" /> */}
      {restaurants.map((restaurant, index) => (
      <div key={index}>
        <img className="rounded-md w-[259px]" src={restaurant.image} alt={restaurant.name}/>
         </div>
    ))}
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

      <div className='flex gap-5 items-center'>
        <img className='rounded-md' src={restaurant1} alt="" />

        <div>
          <p className='text-[14px] font-bold'>Pardes Restaurant</p>
          <img src={stars} alt="" />
          <p className='text-[14px]'>Work time 09:30 - 23:00</p>
          <p className='text-[10px]'>Before you 4$</p>
        </div>

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


