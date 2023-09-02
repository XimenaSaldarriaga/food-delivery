import React, { useEffect, useState } from 'react';
import './orders.scss';
import right from '../../assets/ArrowRight.png';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth, getOrdersForUserByEmail } from '../../context/authContext';

const Orders = () => {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        if (userData && userData.email) {
            getOrdersForUserByEmail(userData.email)
                .then((orders) => {
                    setUserOrders(orders);
                })
                .catch((error) => {
                    console.error('Error fetching user orders:', error);
                });
        }
    }, [userData]);

    const goOrder = (orderId) => {
        navigate(`/history/${orderId}`);
    };

    return (
        <div className='orders my-10 mx-4 flex flex-col gap-10'>
            <h1 className='self-center text-[15px] font-semibold'>All orders</h1>
            {userOrders.length === 0 ? (
                <span className='text-[14px] font-semibold text-gray-400'>You haven't placed any orders yet.</span>
            ) : (
                userOrders.map((historyItem, index) => (
                    <div key={index} onClick={() => goOrder(historyItem.orderId)} className='flex justify-between order-item'>
                        <div className='flex gap-5'>
                            <img src={historyItem.menuImage} alt="" className='menuImg' />
                            <div className='flex flex-col'>
                                <span className='text-[14px] font-semibold'>{historyItem.restaurantName}</span>
                                <span className='text-[14px] text-gray-400'>$ {historyItem.totalCost.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <span className='text-lime-400 text-[10px]'>Delivered</span>
                            <img className='object-contain' src={right} alt="" />
                        </div>
                    </div>
                ))
            )}
            <Footer />
        </div>
    );
}

export default Orders;


