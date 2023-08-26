import React from 'react'
import './restaurant.scss'
import back from '../../assets/Back.png';
import logo from '../../assets/LogoRest.png';
import chef from '../../assets/chef.png';
import dish1 from '../../assets/dish1.png';
import dish2 from '../../assets/dish2.png';
import dish3 from '../../assets/dish3.png';
import dish4 from '../../assets/dish4.png';
import restaurant1 from '../../assets/restaurant1.png';
import stars from '../../assets/Stars.png';
import {  useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
   
    useEffect(() => {
        const fetchRestaurantDetails = async () => {
          try {
            const db = getFirestore();
            const restaurantDocRef = doc(db, 'restaurants', id);
            const restaurantDocSnap = await getDoc(restaurantDocRef);
    
            if (restaurantDocSnap.exists()) {
              setSelectedRestaurant(restaurantDocSnap.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching restaurant details:', error);
          }
        };
    
        fetchRestaurantDetails();
      }, [id]);
    
      if (!selectedRestaurant) {
        return <div>Loading...</div>;
      }

      const goToHome = () => {
        navigate(`/`);
   };
    return (
        <div className='restaurant flex flex-col my-5 mx-6'>
          <img className='object-contain w-[8px]' src={back} alt="" onClick={goToHome} />
           <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 justify-center'>
                        {/* <img className='object-contain' src={chef} alt="" /> */}
                        <img className='object-contain' src={selectedRestaurant.logo} alt="" />
                    </div>

                    <div className='flex gap-6'>
                        <img className='object-contain rounded-[10px]'src={selectedRestaurant.poster} alt={selectedRestaurant.name} />
                        <div className='flex flex-col gap-1'>
                            <p className='text-[14px] font-semibold'>{selectedRestaurant.name}</p>
                            <p className='text-[10px]' >{selectedRestaurant.description}</p>
                            <div className='flex justify-between'>
                                <img className='object-contain' src={stars} alt="" />
                                <span className='text-[10px] bg-gray-100 px-1'>{selectedRestaurant.deliveryTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex text-[10px] gap-4'>
                        <button className='bg-gray-100 px-5 py-2 w-[120px] rounded-[5px]'>All</button>
                        <button className='bg-yellow-300 px-5 py-2 w-[120px] rounded-[5px]'>Salates</button>
                        <button className='bg-gray-100 px-5 py-2 w-[120px] rounded-[5px]'>Pizza</button>
                    </div>

                </div>

                <div className='flex flex-wrap justify-between gap-8'>
                    <div className='restaurant__card flex flex-col gap-1 w-[150px]'>
                        <img className='rounded-md w-[130px]' src={dish1} alt="" />
                        <div>
                            <p className='text-[14px] font-semibold'>Caesar salad without sauce</p>
                            <span className='text-gray-400 text-[14px]'>$ 14.45</span>
                        </div>
                    </div>
                    <div className='restaurant__card flex flex-col gap-1 w-[150px]'>
                        <img className='rounded-md w-[130px]' src={dish2} alt="" />
                        <div>
                            <p className='text-[14px] font-semibold'>Fruit salad</p>
                            <span className='text-gray-400 text-[14px]'>$ 14.45</span>
                        </div>
                    </div>
                    <div className='restaurant__card flex flex-col gap-1 w-[150px]'>
                        <img className='rounded-md w-[130px]' src={dish3} alt="" />
                        <div>
                            <p className='text-[14px] font-semibold'>Salad with shrimp</p>
                            <span className='text-gray-400 text-[14px]'>$ 14.45</span>
                        </div>
                    </div>
                    <div className='restaurant__card flex flex-col gap-1 w-[150px]'>
                        <img className='rounded-md w-[130px]' src={dish4} alt="" />
                        <div>
                            <p className='text-[14px] font-semibold'>Bolognese salad</p>
                            <span className='text-gray-400 text-[14px]'>$ 14.45</span>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Restaurant