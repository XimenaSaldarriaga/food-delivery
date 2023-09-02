import React, { useState, useEffect } from 'react';
import './profileEdit.scss';
import edit from '../../assets/Edit.png';
import back from '../../assets/Back.png';
import camera from '../../assets/Camera.png';
import { useNavigate } from 'react-router-dom';
import { useAuth, updateUserName, updateAddress, updatePhoneNumber, updateProfileImage } from '../../context/authContext';
import uploadFile from '../../services/uploadFile';
import { useRef } from 'react';

const ProfileEdit = () => {
  const { userData, setUserData } = useAuth();
  const [editedData, setEditedData] = useState({
    name: userData ? userData.name : '',
    phoneNumber: userData ? userData.phoneNumber : '',
    address: userData ? userData.address : '',
  });

  const [profileImg, setProfileImg] = useState(userData ? userData.profileImg : '');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setEditedData({
        name: userData ? userData.name : '',
        phoneNumber: userData ? userData.phoneNumber : '',
        address: userData ? userData.address : '',
      });
    }
  }, [isEditing, userData]);

  const handleBackToProfile = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const userEmail = userData.email;

      if (!userEmail) {
        console.error('El email del usuario es inválido.');
        return;
      }

      const updatedUserData = { ...userData };
      if (editedData.name !== userData.name) {
        await updateUserName(userEmail, editedData.name);
        updatedUserData.name = editedData.name;
      }
      if (editedData.phoneNumber !== userData.phoneNumber) {
        await updatePhoneNumber(userEmail, editedData.phoneNumber);
        updatedUserData.phoneNumber = editedData.phoneNumber;
      }
      if (editedData.address !== userData.address) {
        await updateAddress(userEmail, editedData.address);
        updatedUserData.address = editedData.address;
      }
      if (profileImg !== userData.profileImg) {
        const newProfileImgUrl = await uploadFile(profileImg);
        await updateProfileImage(userEmail, newProfileImgUrl);
        updatedUserData.profileImg = newProfileImgUrl;
      }
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      setIsEditing(false);
      console.log('Datos actualizados con éxito:', updatedUserData);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfileImgUrl = await uploadFile(file);
      setProfileImg(newProfileImgUrl);
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className='profileEdit flex flex-col gap-6 my-10 mx-6'>
      <img
        onClick={handleBackToProfile}
        className='object-contain w-[8px]'
        src={back}
        alt=''
      />
      <div className='flex flex-col items-center gap-3'>
        <h1 className='text-[14px] font-semibold'>Profile</h1>
        <div className='relative'>
          <img
            className='rounded-[50%] w-20 h-20 object-cover'
            src={profileImg}
            alt=''
          />
          <label htmlFor='profileImageInput'>
            <img
              className='object-contain absolute bottom-0 right-0 cursor-pointer'
              src={camera}
              alt=''
            />
          </label>
          <input
            id='profileImageInput'
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className='flex flex-col gap-4 text-[14px] font-semibold'>
        <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
          <div className='flex gap-2'>
            <button>
              Name: {isEditing ? (
                <input
                  type='text'
                  value={editedData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                />
              ) : (
                userData && userData.name
              )}
            </button>
          </div>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <img
              className='w- object-contain'
              src={edit}
              alt=''
              onClick={handleEdit}
            />
          )}
        </div>

        <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
          <div className='flex gap-2  '>
            <button> Email: {userData && userData.email}</button>
          </div>
          <img className='w- object-contain' src={edit} alt='' />
        </div>

        <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
          <div className='flex gap-2'>
            <button>
              Phone Number: {isEditing ? (
                <input
                  type='text'
                  value={editedData.phoneNumber}
                  onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                />
              ) : (
                userData && userData.phoneNumber
              )}
            </button>
          </div>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <img
              className='w- object-contain'
              src={edit}
              alt=''
              onClick={() => setActiveField('phoneNumber')}
            />
          )}
        </div>

        <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
          <div className='flex gap-2'>
            <button>
              Address: {isEditing ? (
                <input
                  type='text'
                  value={editedData.address}
                  onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                />
              ) : (
                userData && userData.address
              )}
            </button>
          </div>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            className='profileEdit__button text-[14px] font-semibold rounded-md bg-yellow-300 p-2 cursor-pointer'
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;









