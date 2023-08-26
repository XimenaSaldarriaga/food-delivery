import React from 'react'
import './product.scss'
import back from '../../assets/Back.png';
import time from '../../assets/Time.png';
import { useLocation, useNavigate } from 'react-router-dom';


const Product = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const restaurantId = searchParams.get('restaurantId');
    const restaurantName = searchParams.get('restaurantName'); 

    const handleBackClick = () => {
        if (restaurantId && restaurantName) {
            navigate(`/restaurant/${restaurantId}`, { state: { restaurantName } });
        } else {
            navigate(`/`); 
        }
    };



    return (
        <div className='product'>
            <div className='relative'>
                <img
                    className='absolute left-8 top-8 cursor-pointer'
                    src={back}
                    alt=""
                    onClick={handleBackClick}
                />
                <img className='rounded-md w-[100%] object-contain' src="https://s3-alpha-sig.figma.com/img/255f/ec55/df09594f35ff96fcae46c638467e42c8?Expires=1693785600&Signature=bp9g0oXJ9KM1E3Ku428-VAaMEg2qxcnWN0WITXYX4jL5uck1MjpoEzWqe8xKFLVY075ez7~dRjdGAYVZ7G~Shkc2XMgUWGdO8WrvUluS5m9aA9gXxw33-hOJA-WAgyM~W2ndxPkKnr2E-CLoRFrMCHBiR1AqNY0UGZoRv~VuQG6P6t9U-P2Uo~fBcraCMwcv8AvejkyB8UwAXL9L2xOgCj4-CeKDG2PikkE85BP5wkBulR1f7-yjBPt2b0GIx3xdwQSOCAKDE4VDhATylq2Zdo92dD23kTBZWB6a6IEh34-W3axJZ~7D51bxXFX8~bhXKr2g0NMDV0Abt00h6BndMA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />
            </div>
            <div className=' flex flex-col gap-[6rem] m-4'>
                <div className='flex flex-col gap-3'>
                    <div className='flex justify-between w-full'>
                        <h2 className='text-[20px] font-semibold'>Caesar salad without sauge</h2>
                        <span className='flex text-[10px] items-center gap-1'> <img className='object-contain w-4' src={time} alt="" />15-20 min</span>
                    </div>
                    <p className='text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    <h3 className='text-[14px] text-gray-400'>Additional Ingredients</h3>

                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='bg-yellow-300 w-[15px] h-[15px] inline-block rounded-[3px]' />
                            <span className='text-[14px]'>Tomatoes</span>
                        </div>
                        <span className='text-yellow-300'>+2$</span>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className='bg-gray-100 rounded-[5px] flex justify-between w-[30%] px-3 py-1'>
                        <button>-</button>
                        <span>0</span>
                        <button>+</button>
                    </div>
                    <div className='bg-yellow-300 rounded-[5px] flex justify-between items-center w-[50%] px-6 py-1'>
                        <span className='text-[14px] font-semibold'>Add</span>
                        <span className='font-semibold'>$ 14.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;