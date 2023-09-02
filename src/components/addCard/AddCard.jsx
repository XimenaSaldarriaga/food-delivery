import React, { useState } from 'react';
import back from '../../assets/back.png';
import eye from '../../assets/eye.png';
import './addCard.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const AddCard = () => {
    const navigate = useNavigate();
    const [formComplete, setFormComplete] = useState(false);
    const { addCardToUser } = useAuth();
    const [cardData, setCardData] = useState({
      cardName: '',
      cardNumber: '',
      expires: '',
      cvv: '',
    });

    const goBack = () => {
        navigate('/profile');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardData({
            ...cardData,
            [name]: value,
        });
        setFormComplete(Object.values(cardData).every((val) => val !== ''));
    };

    const addCard = async () => {
        try {
            await addCardToUser(cardData);
            navigate(-1);
        } catch (error) {
            console.error('Error adding card to user in Firestore:', error);
        }
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
                    value={cardData.cardName}
                    onChange={handleInputChange}
                />
                <div className='relative'>
                    <input
                        className='bg-gray-100 p-2 rounded-md w-[100%]'
                        placeholder='Card number'
                        type='number'
                        name='cardNumber'
                        value={cardData.cardNumber}
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
                        value={cardData.expires}
                        onChange={handleInputChange}
                    />
                    <input
                        className='bg-gray-100 p-2 rounded-md'
                        placeholder='CVV'
                        type='number'
                        name='cvv'
                        value={cardData.cvv}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <button
                onClick={addCard}
                className={`bg-yellow-300 py-1 rounded-md font-semibold text-[14px] mt-[15rem] ${formComplete ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!formComplete}
            >
                Save
            </button>
        </div>
    );
};

export default AddCard;

