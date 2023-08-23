import React from 'react'
import logo from '../../assets/Logo.png'
import phone from '../../assets/phone.png'
import './login.scss'


const Login = () => {
  return (
    <div className="login flex flex-col">

      <div className='login__divUp flex flex-col gap-4'>
        <div className="flex flex-col justify-center items-center text-center gap-4" >
          <img src={logo} alt="" />
          <h1 className='login__title'>Sign in</h1>
          <p className='login__text'>Login or create an account with your phone number to start ordering</p>
        </div>

        <div>
          <div className='flex gap-2'>
            <img className='object-contain' src={phone} alt="" />
            <span className='text-gray-400'>+1</span>
          </div>
          <hr className='border-yellow-300' />
        </div>
      </div>


      <div className='login__divDown flex flex-col gap-4'>
        <div className='login__textDown flex flex-col'>
          <span>By clicking the button next you accept</span>
          <span>Terms of use</span>
        </div>

        <button className='login__button p-2 cursor-pointer'>Login</button>
      </div>


    </div>
  );
};

export default Login;
