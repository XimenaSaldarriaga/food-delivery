import React, { useState } from 'react';
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
    const [editedName, setEditedName] = useState(userData ? userData.name : '');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(userData ? userData.phoneNumber : '');
    const [editedAddress, setEditedAddress] = useState(userData ? userData.address : '');
    const [profileImg, setProfileImg] = useState(userData ? userData.profileImg : '');
    const [activeField, setActiveField] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const handleBackToProfile = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        if (
            editedName !== userData.name ||
            editedPhoneNumber !== userData.phoneNumber ||
            editedAddress !== userData.address ||
            profileImg !== userData.profileImg
        ) {
            try {
                const userEmail = userData.email;
                if (!userEmail) {
                    console.error('El email del usuario es inválido.');
                    return;
                }
                const updatedUserData = { ...userData };
                if (activeField === 'name' && editedName !== userData.name) {
                    await updateUserName(userEmail, editedName);
                    updatedUserData.name = editedName;
                }
                if (activeField === 'phoneNumber' && editedPhoneNumber !== userData.phoneNumber) {
                    await updatePhoneNumber(userEmail, editedPhoneNumber);
                    updatedUserData.phoneNumber = editedPhoneNumber;
                }
                if (activeField === 'address' && editedAddress !== userData.address) {
                    await updateAddress(userEmail, editedAddress);
                    updatedUserData.address = editedAddress;
                }
                if (profileImg !== userData.profileImg) {
                    const newProfileImgUrl = await uploadFile(profileImg);
                    await updateProfileImage(userEmail, newProfileImgUrl);
                    updatedUserData.profileImg = newProfileImgUrl;
                }
                setUserData(updatedUserData);
                localStorage.setItem('userData', JSON.stringify(updatedUserData));

                console.log('Datos actualizados con éxito:', updatedUserData);
            } catch (error) {
                console.error('Error al actualizar los datos:', error);
            }
        }
        setActiveField('');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {

            const newProfileImgUrl = await uploadFile(file);
            await updateProfileImage(userData.email, newProfileImgUrl);
            setProfileImg(newProfileImgUrl);

            fileInputRef.current.value = null;
        }
    };

    return (
        <div className='profileEdit flex flex-col gap-6 my-10 mx-6'>
            <img onClick={handleBackToProfile} className='object-contain w-[8px]' src={back} alt="" />
            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-[14px] font-semibold'>Profile</h1>
                <div className='relative'>
                    <img className='rounded-[50%] w-20 h-20 object-cover' src={profileImg} alt="" />
                    <label htmlFor="profileImageInput">
                        <img className='object-contain absolute bottom-0 right-0 cursor-pointer' src={camera} alt="" />
                    </label>
                    <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
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
                        onClick={() => setActiveField('name')}
                    />
                    {activeField === 'name' ? (
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
                        onClick={() => setActiveField('phoneNumber')}
                    />
                    {activeField === 'phoneNumber' ? (
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
                        onClick={() => setActiveField('address')}
                    />
                    {activeField === 'address' ? (
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


