import React from 'react'
import home from '../../assets/Home.png';
import search from '../../assets/Search.png';
import orders from '../../assets/Orders.png';
import profile from '../../assets/Profile.png';
import { useNavigate } from 'react-router-dom'


const Footer = () => {

    const navigate = useNavigate();

    const goToHome= () => {
       navigate('/home')
    }
    const goToSearch= () => {
        navigate('/search')
     }
     
     const goToOrders= () => {
        navigate('/orders')
     }
     const goToProfile= () => {
        navigate('/profile')
     }


    return (
        <div className='bg-white flex justify-between fixed bottom-0 left-0 p-4 w-full'>
            <img className='object-contain' onClick={goToHome} src={home} alt="" />
            <img className='object-contain' onClick={goToSearch} src={search} alt="" />
            <img className='object-contain' onClick={goToOrders} src={orders} alt="" />
            <img className='object-contain' onClick={goToProfile} src={profile} alt="" />
        </div>
    )
}

export default Footer