import React from 'react'
import './history.scss'
import back from '../../assets/back.png'
import { useNavigate } from 'react-router-dom';

const History = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/orders');
      };
    return (
        <div className='history flex flex-col m-6 relative text-[14px gap-[4rem]'>
            <img onClick={goBack} className='w-2 absolute object-contain top-1' src={back} alt="" />
            <h1 className='self-center font-semibold'>26.11.2022</h1>

            <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <span>1x</span>
                        <span>Meat Pizza(medium)</span>
                    </div>
                    <span>$35.50</span>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <span className='text-gray-400'>1x</span>
                        <span>Combined pizza (small)</span>
                    </div>
                    <span>$30.99</span>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <span className='font-semibold'>Production cost</span>
                    <span>$66.49</span>
                </div>
                <div className='flex justify-between'>
                    <span className='font-semibold'>Сost of delivery</span>
                    <span>$8.00</span>
                </div>

                <hr className='bg-gray-500'/>

                <div className='flex justify-between font-semibold'>
                    <span>Total</span>
                    <span>$74.49</span>
                </div>
            </div>
        </div>
    )
}

export default History