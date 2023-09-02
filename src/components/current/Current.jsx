import React, { useEffect, useState } from 'react';
import './current.scss';
import back from '../../assets/back.png';
import clock from '../../assets/clock.png';
import { useNavigate } from 'react-router-dom';
import { getOrdersForUserByEmail, useAuth } from '../../context/authContext';

const Current = () => {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        if (userData && userData.email) {
            getOrdersForUserByEmail(userData.email)
                .then((orders) => {
                    if (orders.length > 0) {
                        setCurrentOrder(orders[0]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user orders:', error);
                });
        }
    }, [userData]);

    const goBack = () => {
        navigate(-1);
    };
    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className='current relative m-6 flex flex-col text-[14px] gap-8'>
            <img onClick={goBack} className='w-2 absolute object-contain top-1' src={back} alt="" />
            <h1 className='self-center font-semibold'>Current order</h1>
            {
                currentOrder && (
                    <div className='bg-yellow-50 flex flex-col px-6 py-4 rounded-md gap-4'>
                        <div className='flex flex-col self-center gap-2 text-[12px]' >
                            <img className='w-15 object-contain' src={clock} alt="" />
                            <span className='font-semibold'>{currentOrder.deliveryTime} Min left </span>
                        </div>
                        <div className='bg-yellow-50 flex flex-col px-6 py-4 rounded-md gap-4'>
                            <div className='flex justify-between text-[10px]'>
                                <div className='flex flex-col gap-1 items-center'>
                                    <button className='w-2 h-2 bg-yellow-300 rounded-full'> </button>
                                    <span>Confirmed</span>
                                </div>
                                <div className='flex flex-col gap-1 items-center'>
                                    <button className='w-2 h-2 bg-yellow-300 rounded-full'> </button>
                                    <span>Cooking</span>
                                </div>
                                <div className='flex flex-col gap-1 items-center'>
                                    <button className='w-2 h-2 bg-gray-300 rounded-full'> </button>
                                    <span>On the way</span>
                                </div>
                                <div className='flex flex-col gap-1 items-center'>
                                    <button className='w-2 h-2 bg-gray-300 rounded-full'> </button>
                                    <span>Delivered</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex justify-between gap-4 items-center'>
                                    <div className='flex gap-2 items-center'>
                                        <img className='w-12 object-contain rounded-md' src={currentOrder.menuImage} alt="" />
                                        <span className='text-[10px] text-gray-400 '>x{currentOrder.quantity}</span>
                                        <span className='font-semibold'>{currentOrder.menuName}</span>
                                    </div>
                                    <span className='text-gray-400'>$ {currentOrder.pricePerItem}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mt-[10%]'>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>Product</span>
                                <span>${currentOrder.total}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>Delivery</span>
                                <span>${currentOrder.deliveryCost}</span>
                            </div>
                            <br />
                            <hr className='bg-gray-500' />
                            <div className='flex justify-between font-semibold items-center'>
                                <span>Total</span>
                                <span className='text-[16px]'>${currentOrder.totalCost}</span>
                            </div>
                        </div>
                    </div>
                )
            }

            <button onClick={goToHome} className='current__button bg-yellow-300 py-2 rounded-md font-semibold'>Return home</button>
        </div>
    );
};

export default Current;
