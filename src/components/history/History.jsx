import React, { useEffect, useState } from 'react';
import './history.scss';
import back from '../../assets/back.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, getOrdersForUserByEmail } from '../../context/authContext';

const History = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { userData } = useAuth();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const userEmail = userData?.email;
        const fetchOrderDetails = async () => {
            try {
                const orders = await getOrdersForUserByEmail(userEmail);
                const order = orders.find(order => order.orderId === orderId);
                if (order) {
                    setOrderDetails(order);
                } else {
                    console.error('Order not found');
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        if (userEmail && orderId) {
            fetchOrderDetails();
        }
    }, [orderId, userData]);

    const goBack = () => {
        navigate('/orders');
    };

    return (
        <div className='history flex flex-col m-6 relative text-[14px] gap-[4rem]'>
            <img onClick={goBack} className='w-2 absolute object-contain top-1' src={back} alt="" />

            {orderDetails && (

                <div className='flex flex-col gap-10'>
                    <h1 className='self-center font-semibold'>{orderDetails.dateOrder.toDate().toLocaleString()}</h1>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <span>{`${orderDetails.quantity}x`}</span>
                            <span>{orderDetails.menuName}</span>
                        </div>
                        <span>{`$${orderDetails.pricePerItem ? orderDetails.pricePerItem.toFixed(2) : ''}`}</span>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Production cost</span>
                            <span>{`$${(orderDetails.pricePerItem * orderDetails.quantity).toFixed(2)}`}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Сost of delivery</span>
                            <span>{`$${orderDetails.deliveryCost.toFixed(2)}`}</span>
                        </div>

                        <hr className='bg-gray-500' />

                        <div className='flex justify-between font-semibold'>
                            <span>Total</span>
                            <span>{`$${orderDetails.totalCost.toFixed(2)}`}</span>
                        </div>
                    </div>


                </div>
            )}

        </div>
    );
}

export default History;
