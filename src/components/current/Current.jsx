import React from 'react'
import './current.scss'
import back from '../../assets/back.png'
import clock from '../../assets/clock.png'
import { useNavigate } from 'react-router-dom';

const Current = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/home');
    };

    return (
        <div className='current relative m-6 flex flex-col text-[14px] gap-8'>
            <img onClick={goBack} className='w-2 absolute object-contain top-1' src={back} alt="" />
            <h1 className='self-center font-semibold'>Current order</h1>

            <div className='bg-yellow-50 flex flex-col px-6 py-4 rounded-md gap-4'>
                <div className='flex flex-col self-center gap-2 text-[12px]' >
                    <img className='w-20 object-contain' src={clock} alt="" />
                    <span className='font-semibold'>15-20 min left</span>
                </div>

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
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-4 items-center'>
                    <div className='flex gap-2 items-center'>
                        <img className='w-10 object-contain rounded-md' src="https://inquiringchef.com/wp-content/uploads/2020/05/Greek-Pizza_square.jpg" alt="" />
                        <span className='text-[10px] text-gray-400 '>x1</span>
                        <span className='font-semibold'>Meat pizza</span>
                    </div>
                    <span className='text-gray-400'>$ 29.00</span>
                </div>
                <div className='flex justify-between gap-4 items-center'>
                    <div className='flex gap-2 items-center'>
                        <img className='w-10 object-contain rounded-md' src="https://aratiendas.com/wp-content/uploads/2021/03/receta-de-ensalada-de-frutas.jpg" alt="" />
                        <span className='text-[10px] text-gray-400 '>x1</span>
                        <span className='font-semibold'>Fresh with funcheza</span>
                    </div>
                    <span className='text-gray-400'>$ 29.00</span>
                </div>
            </div>



            <div className='flex flex-col gap-1 mt-[10%]'>
                <div className='flex justify-between'>
                    <span className='font-semibold'>Product</span>
                    <span>$66.49</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-semibold'>Delivery</span>
                    <span>$8.00</span>
                </div>

                <hr className='bg-gray-500' />

                <div className='flex justify-between font-semibold items-center'>
                    <span>Total</span>
                    <span className='text-[16px]'>$74.49</span>
                </div>
            </div>

            <button onClick={goBack} className='current__button bg-yellow-300 py-2 rounded-md font-semibold'>Return home</button>

        </div>
    )
}

export default Current