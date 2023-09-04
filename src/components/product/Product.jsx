import React from 'react'
import './product.scss'
import back from '../../assets/Back.png';
import time from '../../assets/Time.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';

const Product = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const restaurantId = searchParams.get('restaurantId');
    const restaurantName = searchParams.get('restaurantName');
    const dishId = searchParams.get('dishId');

    const [dishDetails, setDishDetails] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const initialQuantity = parseInt(localStorage.getItem('selectedQuantity')) || 1;
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleBackClick = () => {
        if (restaurantId && restaurantName) {
            navigate(`/restaurant/${restaurantId}`, { state: { restaurantName } });
        } else {
            navigate(`/restaurant/${restaurantId}`);
        }
    };

    const handleQuantityChange = (amount) => {
        const newQuantity = Math.max(1, quantity + amount);
        setQuantity(newQuantity);
    };

    const handleIngredientToggle = (index) => {
        setSelectedIngredients((prevSelected) => ({
            ...prevSelected,
            [index]: !prevSelected[index],
        }));
    };

    const calculateTotalPrice = () => {
        let total = dishDetails?.price || 0;

        if (dishDetails?.ingredients) {
            total += dishDetails.ingredients.reduce((acc, _, index) => {
                return acc + (selectedIngredients[index] ? 2000 : 0);
            }, 0);
        }

        return total;
    };

    useEffect(() => {
        const fetchDishDetails = async () => {
            try {
                const db = getFirestore();
                const dishDocRef = doc(db, 'restaurants', restaurantId, 'menu', dishId);
                const dishDocSnap = await getDoc(dishDocRef);

                if (dishDocSnap.exists()) {
                    const dishData = dishDocSnap.data();
                    setDishDetails(dishData);

                    const initialSelectedIngredients = dishData.ingredients.reduce((acc, _, index) => {
                        return {
                            ...acc,
                            [index]: selectedIngredients[index] || false,
                        };
                    }, {});
                    setSelectedIngredients(initialSelectedIngredients);


                    let initialPrice = dishData.price || 0;
                    if (dishData.ingredients) {
                        initialPrice += dishData.ingredients.filter((_, index) => initialSelectedIngredients[index]).length * 2;
                    }
                    setTotalPrice(initialPrice);

                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching dish details:', error);
            }
        };

        const savedQuantity = localStorage.getItem('selectedQuantity');
        if (savedQuantity) {
            setQuantity(Number(savedQuantity));
        }

        if (restaurantId && dishId) {
            fetchDishDetails();
        }
    }, [dishDetails, selectedIngredients]);

    useEffect(() => {
        localStorage.setItem('selectedQuantity', quantity.toString());
    }, [quantity]);

    const handleOrderClick = () => {
        if (dishDetails) {
            navigate('/order', {
                state: {
                    dish: dishDetails,
                    selectedIngredients,
                    initialQuantity: quantity,
                    totalAmount: calculateTotalPrice() * quantity,
                },
            });
        }
    };


    return (
        <div className='product'>
            <div className='relative'>
                <img
                    className='absolute left-8 top-8 cursor-pointer'
                    src={back}
                    alt=""
                    onClick={handleBackClick}
                />
                {dishDetails && (
                    <img
                        className='rounded-md w-[100%] object-contain'
                        src={dishDetails.image}
                        alt={dishDetails.name}
                    />
                )}
            </div>
            <div className='flex flex-col gap-[3rem] m-4'>
                <div className='flex flex-col gap-3'>
                    <div className='flex justify-between w-full'>
                        <h2 className='text-[20px] font-semibold'>{dishDetails?.name}</h2>
                        <span className='flex text-[10px] items-center gap-1'>
                            <img className='object-contain w-4' src={time} alt="" />
                            {dishDetails?.time}
                        </span>
                    </div>
                    <p className='text-[14px]'>{dishDetails?.description}</p>
                    <h3 className='text-[14px] text-gray-400'>Additional Ingredients</h3>

                    {dishDetails?.ingredients && dishDetails?.ingredients.map((ingredient, index) => (
                        <div className='flex justify-between items-center' key={index}>
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="checkbox"
                                    className='bg-yellow-300 w-[15px] h-[15px] inline-block rounded-[3px]'
                                    checked={selectedIngredients[index]}
                                    onChange={() => handleIngredientToggle(index)}
                                />
                                <span className='text-[14px]'>{ingredient}</span>
                            </div>
                            <span className='text-yellow-300'>{selectedIngredients[index] ? '+ $ 2000' : ''}</span>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='bg-gray-100 rounded-[5px] flex justify-between w-[30%] px-3 py-1'>
                        <button onClick={() => handleQuantityChange(-1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                    <div onClick={handleOrderClick} className='bg-yellow-300 rounded-[5px] flex justify-between items-center w-[50%] px-6 py-1'>
                        <span className='text-[14px] font-semibold' > Add </span>
                        <span className='font-semibold'>$ {(calculateTotalPrice() * quantity).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
