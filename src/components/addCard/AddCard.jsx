import React, { useState } from 'react';
import back from '../../assets/back.png';
import eye from '../../assets/eye.png';
import './addCard.scss';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
    const navigate = useNavigate();
    const [formComplete, setFormComplete] = useState(false);

    const goToPayment = () => {
        if (formComplete) {
            navigate('/payment');
        }
    };

    const goBack = () => { {
            navigate('/payment');
        }
    };

    const handleInputChange = (event) => {
        const cardName = event.target.form['cardName'].value;
        const cardNumber = event.target.form['cardNumber'].value;
        const expires = event.target.form['expires'].value;
        const cvv = event.target.form['cvv'].value;
        setFormComplete(cardName && cardNumber && expires && cvv);
    };

    return (
        <div className='card flex flex-col gap-10 mx-6 my-10 relative text-[14px]'>
            <img onClick={goBack} className='object-contain w-2 absolute top-1 left-2' src={back} alt="" />
            <h1 className='self-center font-semibold'>Add new card</h1>
            <form className='flex flex-col gap-5'>
                <input
                    className='bg-gray-100 p-2 rounded-md'
                    placeholder='Card name'
                    type='text'
                    name='cardName'
                    onChange={handleInputChange}
                />
                <div className='relative'>
                    <input
                        className='bg-gray-100 p-2 rounded-md w-[100%]'
                        placeholder='Card number'
                        type='number'
                        name='cardNumber'
                        onChange={handleInputChange}
                    />
                    <img className='object-contain w-4 absolute top-3 right-5' src={eye} alt='' />
                </div>
                <div>
                    <input
                        className='bg-gray-100 p-2 rounded-md'
                        placeholder='Expires'
                        type='number'
                        name='expires'
                        onChange={handleInputChange}
                    />
                    <input
                        className='bg-gray-100 p-2 rounded-md'
                        placeholder='CVV'
                        type='number'
                        name='cvv'
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <button
                onClick={goToPayment}
                className={`bg-yellow-300 py-1 rounded-md font-semibold text-[14px] mt-[15rem] ${formComplete ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!formComplete}
            >
                Save
            </button>
        </div>
    );
};

export default AddCard;
