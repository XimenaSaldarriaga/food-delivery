import React from 'react'
import './payment.scss'
import master from '../../assets/master.png'
import pay from '../../assets/pay.png'
import back from '../../assets/back.png'
import eye from '../../assets/eye.png'

const Payment = () => {
    return (
        <div className='payment flex flex-col gap-16 relative mx-6 my-10'>
            <img className='object-contain w-2 absolute top-1 left-2' src={back} alt="" />
            <h1 className='self-center font-semibold'>Payment method</h1>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <img className='object-contain' src={master} alt="" />
                        <span>**** **** **** 5247</span>
                    </div>
                    <img className='object-contain' src={eye} alt="" />
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <img className='object-contain' src={pay} alt="" />
                        <span>******@gmail.com</span>
                    </div>
                    <img className='object-contain' src={eye} alt="" />
                </div>
            </div>

            <button className='payment__button bg-yellow-300 py-1 rounded-md'>Add a new card</button>

        </div>
    )
}

export default Payment