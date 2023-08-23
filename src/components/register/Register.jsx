import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import './register.scss'

const Register = () => {
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;

    try {
      await signUp(email, password);
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='register flex flex-col'>
      <h2 className='register__title'>Create account</h2>
      <form className='flex flex-col gap-80' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="register__input"
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="register__input"
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="register__input"
            />
          </div>
        </div>
        <button className='register__button p-2 cursor-pointer bg-yellow-300' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Register;
