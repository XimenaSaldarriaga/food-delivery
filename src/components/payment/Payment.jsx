import React, { useState, useEffect } from 'react';
import master from '../../assets/master.png';
import visa from '../../assets/visa.png';
import back from '../../assets/back.png';
import del from '../../assets/delete.png';
import { useNavigate } from 'react-router-dom';
import { useAuth, getCardsForUserByEmail } from '../../context/authContext';
import './payment.scss'

const Payment = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (userData) {
      const userEmail = userData.email;
      getCardsForUserByEmail(userEmail)
        .then((cards) => {
          setCardData(cards);
        })
        .catch((error) => {
          console.error('Error fetching card data:', error);
        });
    }
  }, [userData]);

  const goAddCard = () => {
    navigate('/card');
  };

  const goProfile = () => {
    navigate('/profile');
  };

  return (
    <div className='payment flex flex-col gap-16 relative mx-6 my-10'>
      <img className='object-contain w-2 absolute top-1 left-2' src={back} alt='' onClick={goProfile} />
      <h1 className='self-center font-semibold'>Payment method</h1>

      {cardData.length > 0 ? (
        <div>
          {cardData.map((card, index) => (
            <div className='flex justify-between' key={index}>
              <div className='flex gap-4 items-center'>
                {card.cardName.toLowerCase() === 'visa' && (
                  <img className='w-10' src={visa} alt='Visa' />
                )}
                {card.cardName.toLowerCase() === 'mastercard' && (
                  <img className='object-contain' src={master} alt='Mastercard' />
                )}
                <span>{card.cardNumber}</span>
              </div>
              <img className='object-contain w-4' src={del} alt='Eye' />
            </div>
          ))}
        </div>
      ) : (
        <span>No cards added</span>
      )}

      <button onClick={goAddCard} className='payment__button bg-yellow-300 py-1 rounded-md font-semibold'>
        Add a new card
      </button>
    </div>
  );
};

export default Payment;
