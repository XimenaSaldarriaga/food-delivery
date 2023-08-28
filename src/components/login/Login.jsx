import React from 'react';
import { useForm } from 'react-hook-form';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import logo from '../../assets/Logo.png'
import './login.scss';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/home');
      Swal.fire({
        text: 'Welcome!',
        confirmButtonColor: '#FFE031',
      });

    } catch (error) {
      console.error('Error logging in:', error);
      Swal.fire({
        text: 'The data does not match',
        confirmButtonColor: '#FFE031',
      });
    }
  };

  const goRegister = () => {
    navigate('./register')
  }

  return (

    <div className="login flex flex-col">

      <div className='login__divUp flex flex-col gap-4'>
        <div className="flex flex-col justify-center items-center text-center gap-4" >
          <img src={logo} alt="" />
          <h1 className='login__title'>Sign in</h1>
          <p className='login__text w-60'>Login or create an account with your phone number to start ordering</p>
        </div>

        <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <label className='text-gray-400 login__label'>Email</label>
              <input
                type="email"
                name="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email format',
                  },
                })}
                className="login__input"
              />
              {errors.email && <span className="error" style={{ color: 'red', fontSize: '10px' }}>{errors.email.message}</span>}
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-400 login__label'>Password</label>
              <input
                type="password"
                name="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                className="login__input"
              />
              {errors.password && <span className="error" style={{ color: 'red', fontSize: '10px' }}>{errors.password.message}</span>}
            </div>
            <button className='login__button bg-yellow-300 p-2 cursor-pointer' type="submit">Login</button>
          </div>
        </form>
        <button className='login__signUp bg-yellow-300 p-2 cursor-pointer' onClick={goRegister}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
