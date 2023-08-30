import React from 'react'
import './profile.scss'
import account from '../../assets/Account.png';
import alarm from '../../assets/Alarm.png';
import coin from '../../assets/Coin.png';
import languaje from '../../assets/Language.png';
import location from '../../assets/LocationGray.png';
import faq from '../../assets/FAQ.png';
import call from '../../assets/Call.png';
import next from '../../assets/Next.png';
import switcher from '../../assets/Switcher.png';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../redux/taskSlice';
import logout from '../../assets/logout.png';



const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setIsAuthenticated(false)); 
        localStorage.removeItem('isAuthenticated');
        navigate('/');
      };

      const handleEditProfile = () => {
        navigate('/profile-edit');
      };

      const handlePayment = () => {
        navigate('/payment');
      };
    
    return (
        <div className='profile flex flex-col gap-6 m-6 relative'>
            <img src={logout} className='profile__button absolute w-5 top-4 left-2' onClick={handleLogout} alt="" />
            <div className='flex flex-col items-center'>
                <img className='rounded-[50%] w-20' src="https://s3-alpha-sig.figma.com/img/c13c/1e24/1e6baeeb9f8d7582f9d06e78b4720cca?Expires=1693785600&Signature=MUyEa2d4xtW4twlnlKMXSdYnv64D50IF-HwjmFxzsTWFFk3JP-MMJUEd66p8x3K9LsxGhVq8u8DjuBOZZ2KVSG3xh5O9AYl1dbkIgy4coV5qOZhafVR6VyOoYKdzcKuMmlpx~OqIxJAAA-pu~4DcLDG8vlkCsG8I8fJHcOBClqnCKo515npK5R6GHJKNoWzQtl52Rs1zg0MxkSMRXmc9bOF5B51cUwykHXJZSh8~KAHDp37IEqPmE0QKNrSBT~ttsAu6H0vJzqKYoBwWDhZgOazA9R11ZsVFFy2Shk~cEl0FIJVhrFFrTq9reV0lkL66RU0K3CHGHILDvca~jNu4cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />
                <span className='text-[14px] font-semibold'>Jenny Wilson</span>
            </div>

            <div className='flex flex-col gap-4 text-[14px] font-semibold'>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between' >
                    <div className='flex gap-2' >
                        <img className='object-contain' src={account} alt="" />
                        <button >Account edit </button>
                    </div>
                    <img className='w- object-contain w-[7px]' src={next} alt="" onClick={handleEditProfile}/>
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2  '>
                        <img className='object-contain' src={alarm} alt="" />
                        <button>Account edit</button>
                    </div>
                    <img className='w- object-contain w-[16px]' src={switcher} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between' onClick={handlePayment}>
                    <div className='flex gap-2'>
                        <img className='object-contain' src={coin} alt="" />
                        <button>Payment</button>
                    </div>
                    <img className='w- object-contain w-[7px]' src={next} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <img className='object-contain' src={languaje} alt="" />
                        <button>Language</button>
                    </div>
                    <img className='w- object-contain w-[7px]' src={next} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2 '>
                        <img className='object-contain' src={location} alt="" />
                        <button>Location</button>
                    </div>
                    <span className='text-[10px] text-gray-400'>Eng</span>
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <img className='object-contain' src={faq} alt="" />
                        <button>FAQ</button>
                    </div>
                    <img className='w- object-contain w-[7px]' src={next} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2 '>
                        <img className='object-contain' src={call} alt="" />
                        <button>Support</button>
                    </div>
                    <img className='w- object-contain w-[7px]' src={next} alt="" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;