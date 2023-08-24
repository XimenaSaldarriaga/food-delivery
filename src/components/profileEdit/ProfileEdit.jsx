import React from 'react'
import './profileEdit.scss'
import edit from '../../assets/Edit.png';
import back from '../../assets/Back.png';
import camera from '../../assets/Camera.png';

const ProfileEdit = () => {
    return (
        <div className='profileEdit flex flex-col gap-6 my-10 mx-6'>

            <img className='object-contain w-[8px]' src={back} alt="" />

            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-[14px] font-semibold'>Profile</h1>
                <div className='relative'>
                    <img className='rounded-full w-20' src="https://s3-alpha-sig.figma.com/img/c13c/1e24/1e6baeeb9f8d7582f9d06e78b4720cca?Expires=1693785600&Signature=MUyEa2d4xtW4twlnlKMXSdYnv64D50IF-HwjmFxzsTWFFk3JP-MMJUEd66p8x3K9LsxGhVq8u8DjuBOZZ2KVSG3xh5O9AYl1dbkIgy4coV5qOZhafVR6VyOoYKdzcKuMmlpx~OqIxJAAA-pu~4DcLDG8vlkCsG8I8fJHcOBClqnCKo515npK5R6GHJKNoWzQtl52Rs1zg0MxkSMRXmc9bOF5B51cUwykHXJZSh8~KAHDp37IEqPmE0QKNrSBT~ttsAu6H0vJzqKYoBwWDhZgOazA9R11ZsVFFy2Shk~cEl0FIJVhrFFrTq9reV0lkL66RU0K3CHGHILDvca~jNu4cA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />
                    <img className='object-contain absolute bottom-0 right-0' src={camera} alt="" />
                </div>
            </div>

            <div className='flex flex-col gap-4 text-[14px] font-semibold'>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>Jenny Wilson</button>
                    </div>
                    <img className='w- object-contain' src={edit} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2  '>
                        <button>jennywilson@gmail.com</button>
                    </div>
                    <img className='w- object-contain' src={edit} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>+1 903 354 43 43</button>
                    </div>
                    <img className='w- object-contain' src={edit} alt="" />
                </div>
                <div className='bg-gray-100 flex rounded-[10px] p-3 justify-between'>
                    <div className='flex gap-2'>
                        <button>+1 903 354 43 43</button>
                    </div>
                    <img className='w- object-contain' src={edit} alt="" />
                </div>
            </div>

            <button className='profileEdit__button text-[14px] font-semibold rounded-md bg-yellow-300 p-2 cursor-pointer'>Save</button>
        </div>
    )
}

export default ProfileEdit
