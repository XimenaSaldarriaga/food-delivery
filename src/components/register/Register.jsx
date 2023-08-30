import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import './register.scss';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/Back.png';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import uploadFile from '../../services/uploadFile';

const Register = () => {

  const [profileImg, setProfileImageURL] = useState('');
  const [imageSelected, setImageSelected] = useState(false);

  const handleImageUpload = async (imageFile) => {
    try {
      const imageUrl = await uploadFile(imageFile);
      setProfileImageURL(imageUrl);
      setImageSelected(true);
    } catch (error) {
      console.log(error);
      alert('La imagen no fue cargada correctamente');
    }
  };

  const handleFileInputClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const goToLogin = () => {
    navigate('/')
  }

  const { signUp } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, password, address, phoneNumber } = data;
    console.log('Form Data:', data);
    try {
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      await signUp(email, password);

      const userData = {
        name,
        email,
        address,
        phoneNumber,
        profileImg,
      };

      const usersCollection = collection(db, 'users');

      await addDoc(usersCollection, userData);

      console.log('User registered successfully', userData);

      if (profileImg) {
        const imageUrl = await uploadFile(profileImg);
        console.log('Image uploaded to Cloudinary:', imageUrl);
      }

      navigate('/');
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

    <div className='register flex flex-col '>
      <img onClick={goToLogin} className='absolute top-[3.3rem] ' src={back} alt="" />
      <h2 className='register__title self-center'> Create account </h2>
      <form className='flex flex-col gap-12' onSubmit={handleSubmit(onSubmit)}>
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
              className="register__input "
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
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>ADDRESS</label>
            <input
              type="text"
              name="address"
              {...register('address', {
                required: 'Address is required',

              })}
              className="register__input"
            />
            {errors.address && <span className="error" style={{ color: 'red', fontSize: '10px' }}>{errors.address.message}</span>}
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400 register__label'>
              PHONE NUMBER
            </label>
            <input
              type='tel'
              name='phoneNumber'
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number format',
                },
              })}
              className='register__input'
            />
            {errors.phoneNumber && (
              <span
                className='error'
                style={{ color: 'red', fontSize: '10px' }}
              >
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className='flex flex-col image-upload-container'>
            <label className='text-gray-400 register__label'>
              PROFILE IMAGE
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfileImageURL(handleImageUpload(e.target.files[0]));
                  setImageSelected(true);
                } else {
                  setImageSelected(false);
                }
              }}
            />
            <button
              type="button"
              className={`button__file p-1 cursor-pointer ${imageSelected ? 'bg-yellow-300' : 'bg-gray-300'
                }`}
              onClick={handleFileInputClick}
            >
              {imageSelected ? 'CHANGE IMAGE' : 'SELECT FILE'}
            </button>

            {profileImg && (
              <div className='profile-preview-container'>
                <img src={profileImg} alt='Profile' className='profile-preview' />
              </div>
            )}
          </div>

        </div>
        <button className='register__button p-2 cursor-pointer bg-yellow-300' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Register;

