import React from 'react'
import './orders.scss'
import right from '../../assets/ArrowRight.png';
import chef from '../../assets/chef.png';
import Footer from '../footer/Footer';

const Orders = () => {
    return (
        <div className='orders my-10 mx-4 flex flex-col gap-10'>
            <h1 className='self-center text-[15px] font-semibold'>All orders</h1>

            <div className='flex justify-between'>

                <div className='flex gap-5'>
                    <img src={chef} alt="" />

                    <div className='flex flex-col'>
                        <span className='text-[14px] font-semibold'>Pardes restaurant</span>
                        <span className='text-[14px] text-gray-400'>$ 132.00</span>
                    </div>
                </div>

                <div className='flex gap-2 items-center'>
                    <span className='text-lime-400 text-[10px]'>Delivered</span>
                    <img className='object-contain' src={right} alt="" />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Orders