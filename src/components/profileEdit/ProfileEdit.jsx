import React, { useState } from 'react';
import './profileEdit.scss';
import edit from '../../assets/Edit.png';
import back from '../../assets/Back.png';
import camera from '../../assets/Camera.png';
import { useNavigate } from 'react-router-dom';
import { useAuth, updateUserName } from '../../context/authContext';

const ProfileEdit = () => {
    const { userData, setUserData } = useAuth();
    const [editedName, setEditedName] = useState(userData ? userData.name : '');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(userData ? userData.phoneNumber : '');
    const [editedAddress, setEditedAddress] = useState(userData ? userData.address : '');
    const [showNameInput, setShowNameInput] = useState(false);
    const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);
    const [showAddressInput, setShowAddressInput] = useState(false);
    const navigate = useNavigate();

    const handleBackToProfile = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        if (
          editedName !== userData.name ||
          editedPhoneNumber !== userData.phoneNumber ||
          editedAddress !== userData.address
        ) {
          try {
            const userEmail = userData.email;
            if (!userEmail) {
              console.error('El email del usuario es inválido.');
              return;
            }
            const updatedUserData = { ...userData };
            if (editedName !== userData.name) {
              await updateUserName(userEmail, editedName);
              updatedUserData.name = editedName;
              setShowNameInput(false);
            }
            if (editedPhoneNumber !== userData.phoneNumber) {
              setShowPhoneNumberInput(false);
            }
            if (editedAddress !== userData.address) {
              setShowAddressInput(false); 
            }
            setUserData(updatedUserData);
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
            console.log('Datos actualizados con éxito:', updatedUserData);
          } catch (error) {
            console.error('Error al actualizar los datos:', error);
          }
        }
      };


    return (
        <div className='profileEdit flex flex-col gap-6 my-10 mx-6'>
            <img onClick={handleBackToProfile} className='object-contain w-[8px]' src={back} alt="" />
            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-[14px] font-semibold'>Profile</h1>
                <div className='relative'>
                    <img className='rounded-[50%] w-20 h-20 object-cover' src={userData && userData.profileImg} alt="" />
                    <img className='object-contain absolute bottom-0 right-0' src={camera} alt="" />
                </div>
            </div>

            <div className='flex flex-col gap-4 text-[14px] font-semibold'>

                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>{userData && userData.name}</button>
                    </div>
                    <img
                        className='w- object-contain'
                        src={edit}
                        alt=""
                        onClick={() => setShowNameInput(true)}
                    />
                    {showNameInput ? (
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    ) : null}
                </div>

                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2  '>
                        <button>{userData && userData.email}</button>
                    </div>
                    <img className='w- object-contain' src={edit} alt="" />

                </div>

                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>{userData && userData.phoneNumber}</button>
                    </div>
                    <img
                        className='w- object-contain'
                        src={edit}
                        alt=""
                        onClick={() => setShowPhoneNumberInput(true)}
                    />
                    {showPhoneNumberInput ? (
                        <input
                            type="text"
                            value={editedPhoneNumber}
                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                        />
                    ) : null}
                </div>

                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>{userData && userData.address}</button>
                    </div>
                    <img
                        className='w- object-contain'
                        src={edit}
                        alt=""
                        onClick={() => setShowAddressInput(true)}
                    />
                    {showAddressInput ? (
                        <input
                            type="text"
                            value={editedAddress}
                            onChange={(e) => setEditedAddress(e.target.value)}
                        />
                    ) : null}
                </div>
            </div>

            <button onClick={handleSave} className='profileEdit__button text-[14px] font-semibold rounded-md bg-yellow-300 p-2 cursor-pointer'>Save</button>
        </div>
    );
};

export default ProfileEdit;

