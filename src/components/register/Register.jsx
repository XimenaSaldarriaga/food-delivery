import React from 'react';
import { useAuth } from '../../context/authContext';
import './register.scss';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { signUp } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      await signUp(email, password);
      console.log('User registered successfully');

      await Swal.fire({
        text: 'You have successfully registered!',
        confirmButtonColor: '#FFE031',
      });

      reset();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='register flex flex-col'>
      <h2 className='register__title'>Create account</h2>
      <form className='flex flex-col gap-80' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>NAME</label>
            <input
              type="text"
              name="name"
              {...register('name', { required: 'Name is required' })}
              className="register__input"
            />
            {errors.name && <span className="error" style={{ color: 'red', fontSize: '10px' }}>{errors.name.message}</span>}
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>EMAIL</label>
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
              className="register__input"
            />
            {errors.email && <span className="error" style={{ color: 'red', fontSize: '10px' }}>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>PASSWORD</label>
            <input
              type="password"
              name="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
              className="register__input"
            />
            {errors.password && <span className="error" style={{ color: 'red', fontSize: '10px' }}>{errors.password.message}</span>}
          </div>
        </div>
        <button className='register__button p-2 cursor-pointer bg-yellow-300' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Register;

