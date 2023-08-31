import React from 'react'
import './profileEdit.scss'
import edit from '../../assets/Edit.png';
import back from '../../assets/Back.png';
import camera from '../../assets/Camera.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const ProfileEdit = () => {

    const { userData } = useAuth(); 
    const navigate = useNavigate();
    const handleBackToProfile = () => {
        navigate(-1);
    };

    return (
        <div className='profileEdit flex flex-col gap-6 my-10 mx-6'>

            <img onClick={handleBackToProfile} className='object-contain w-[8px]' src={back} alt=""  />

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
                    <img className='w- object-contain' src={edit} alt="" />
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
                    <img className='w- object-contain' src={edit} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>{userData && userData.address}</button>
                    </div>
                    <img className='w- object-contain' src={edit} alt="" />
                </div>
            </div>

            <button className='profileEdit__button text-[14px] font-semibold rounded-md bg-yellow-300 p-2 cursor-pointer'>Save</button>
        </div>
    )
}

export default ProfileEdit
