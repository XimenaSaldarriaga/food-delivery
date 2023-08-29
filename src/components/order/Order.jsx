import React, { useState } from 'react'
import './order.scss'
import back from '../../assets/Back.png';
import next from '../../assets/Next.png';
import ubication from '../../assets/Location.png';
import master from '../../assets/master.png';
import pay from '../../assets/pay.png';
import { useLocation, useNavigate } from 'react-router-dom'

const Order = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { state: locationState = {} } = location;
    const { dish, selectedIngredients, initialQuantity } = locationState;
    const delivery = 7000;

    const [quantity, setQuantity] = useState(initialQuantity);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
    };

    const AdditionalIngredients = () => {
        const selectedIngredientsCount = Object.values(selectedIngredients).filter(Boolean).length;
        return selectedIngredientsCount * 2000;
    };

    const totalIngredients = AdditionalIngredients() * quantity
    const totalProducts = dish?.price * quantity;
    const totalOrder = totalProducts + totalIngredients + delivery;

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const isOrderButtonDisabled = selectedPaymentMethod === null;

    const goToHome = () => {
        navigate('/home')
    }

    return (
        <div className='order relative flex flex-col gap-[4rem] m-6 text-[14px] font-semibold'>

            <div className='flex flex-col gap-6'>
                <img onClick={handleBackClick} className='absolute left-2 top-1' src={back} alt="" />
                <h1 className='flex justify-center'>New order</h1>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-[20px]'>Deliver to</h2>
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <img className='object-contain w-5' src={ubication} alt="" />
                            <p>882 Well St, New-York</p>
                        </div>
                        <img className='object-contain' src={next} alt="" />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-[20px]'>Payment</h2>
                    <div className='flex gap-4'>
                        <button
                            className={`bg-${selectedPaymentMethod === 'Cash' ? 'yellow-300' : 'gray-100'} rounded-md px-6 py-1 items-center flex w-[150px] justify-center text-[10px]`}
                            onClick={() => handlePaymentMethodSelect('Cash')}
                        >
                            Cash
                        </button>
                        <button
                            className={`bg-${selectedPaymentMethod === 'MasterCard' ? 'yellow-300' : 'gray-100'} flex gap-1 rounded-md px-6 py-1 items-center text-[10px] w-[150px] justify-center`}
                            onClick={() => handlePaymentMethodSelect('MasterCard')}
                        >
                            <img src={master} alt="" />
                            ...2578
                        </button>
                        <button
                            className={`bg-${selectedPaymentMethod === 'PayPal' ? 'yellow-300' : 'gray-100'} flex gap-1 rounded-md px-6 py-1 items-center text-[10px] w-[150px] justify-center`}
                            onClick={() => handlePaymentMethodSelect('PayPal')}
                        >
                            <img src={pay} alt="" />
                            PayPal
                        </button>
                    </div>
                </div>


                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-4 items-center '>
                            <img className='w-[44px] h-[44px] object-cover rounded-md' src={dish?.image} alt={dish?.name} />
                            <div className='bg-gray-100 w-[40px] flex justify-center gap-4 px-8 rounded-[10px] text-[12px]'>
                                <button onClick={() => handleQuantityChange(-1)}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                            <span>{dish?.name}</span>
                        </div>
                        <span className='text-gray-400'>{`$ ${dish?.price.toFixed(2)}`}</span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-[20px]'>Note</h2>
                    <input className='border-[1px] rounded-md p-2 border-gray-400 w-[100%] ' type="text" placeholder='Write something' />
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <span>Products </span>
                    <span>$ {totalProducts.toFixed(2)} </span>
                </div>
                <div className='flex justify-between'>
                    <span> Additional Ingredients </span>
                    <span>$ {totalIngredients} </span>
                </div>
                <div className='flex justify-between'>
                    <span>Delivery</span>
                    <span>$ {delivery} </span>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <span>Total</span>
                    <span className='text-[18px]'>$ {totalOrder} </span>
                </div>
                <button
                    className={`bg-${isOrderButtonDisabled ? 'yellow-100' : 'yellow-300'}  w-[100%] rounded-md p-2`}
                    disabled={isOrderButtonDisabled}
                    onClick={goToHome}>Order
                </button>
            </div>
        </div>
    )
}

export default Order;