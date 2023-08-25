import React from 'react';
import logo from '../../assets/Logo.png';
import keyboard from '../../assets/Keyboard.png';
import './check.scss';

const Check = () => {
  return (
    <div className='check flex flex-col justify-between h-screen'>
      <div className='flex flex-col justify-center items-center text-center gap-4 mt-10'>
        <img src={logo} alt="" />
        <h1 className='check__title'>Verification</h1>
        <p className=' check__text w-60'>Enter the four-digit code from SMS
          SMS not received. <span className='check__span'> Send again?</span></p>
        <div>__ __ __ __</div>
      </div>

      <div className="flex justify-center items-end h-full w-full">
        <img src={keyboard} alt="" />
      </div>
    </div>
  );
}

export default Check;

