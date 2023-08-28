import React from 'react'
import home from '../../assets/Home.png';
import search from '../../assets/Search.png';
import orders from '../../assets/Orders.png';
import profile from '../../assets/Profile.png';

const Footer = () => {
    return (
        <div className='bg-white flex justify-between fixed bottom-0 left-0 p-4 w-full'>
            <img className='object-contain' src={home} alt="" />
            <img className='object-contain' src={search} alt="" />
            <img className='object-contain' src={orders} alt="" />
            <img className='object-contain' src={profile} alt="" />
        </div>
    )
}

export default Footer