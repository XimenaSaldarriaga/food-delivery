import React, { useState, useEffect } from 'react'
import './order.scss'
import back from '../../assets/Back.png';
import next from '../../assets/Next.png';
import ubication from '../../assets/Location.png';
import master from '../../assets/master.png';
import visa from '../../assets/visa.png';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth, getCardsForUserByEmail } from '../../context/authContext';


const Order = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [userCards, setUserCards] = useState([]);
    const { userData, addOrderToUser, setCardButtonVisible } = useAuth();
    const { state: locationState = {} } = location;
    const { dish, selectedIngredients, initialQuantity } = locationState;
    const initialQuantityFromLocalStorage = localStorage.getItem('selectedQuantity');
    const initialQuantityFromState = initialQuantityFromLocalStorage ? parseInt(initialQuantityFromLocalStorage, 10) : 1;
    const [quantity, setQuantity] = useState(initialQuantityFromState);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const delivery = quantity === 0 ? 0 : 7000;
    const [note, setNote] = useState("");
    const userHasInfo = userData && userData.name && userData.phoneNumber && userData.address;

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleQuantityChange = (amount) => {
        const newQuantity = quantity + amount;

        if (newQuantity >= 0) {
            setQuantity(newQuantity);
            localStorage.setItem('selectedQuantity', newQuantity.toString());
        }
        if (newQuantity === 0) {
            setSelectedPaymentMethod(null);
        }
    };

    useEffect(() => {
        localStorage.setItem('selectedQuantity', quantity.toString());
    }, [quantity]);



    const AdditionalIngredients = () => {
        const selectedIngredientsCount = Object.values(selectedIngredients).filter(Boolean).length;
        return selectedIngredientsCount * 2000;
    };

    const totalIngredients = AdditionalIngredients() * quantity
    const totalProducts = dish?.price * quantity;
    const totalOrder = totalProducts + totalIngredients + delivery;

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const isOrderButtonDisabled = selectedPaymentMethod === null;
    const currentTimestamp = new Date();

    const goToHome = async () => {
        const orderData = {
            restaurantName: dish?.restaurant,
            menuImage: dish?.image,
            menuName: dish?.name,
            pricePerItem: dish?.price,
            deliveryTime: dish?.time,
            quantity: quantity,
            deliveryCost: delivery,
            total: totalProducts,
            totalCost: totalOrder,
            dateOrder: currentTimestamp,
            note: note,
        };

        try {

            await addOrderToUser(orderData);
            setCardButtonVisible(true);
            localStorage.setItem('currentOrder', JSON.stringify(orderData));
            navigate('/home');

        } catch (error) {
            console.error('Error al registrar el pedido en Firestore:', error);
        }
    };

    const goToCard = () => {
        navigate('/card')
    }

    useEffect(() => {
        if (userData) {
            const userEmail = userData.email;
            getCardsForUserByEmail(userEmail)
                .then((cards) => {
                    setUserCards(cards);
                })
                .catch((error) => {
                    console.error('Error fetching card data:', error);
                });
        }
    }, [userData]);

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };


    return (
        <div className='order relative flex flex-col gap-[4rem] m-6 text-[14px] font-semibold'>

            <div className='flex flex-col gap-6'>
                <img onClick={handleBackClick} className='absolute left-2 top-1' src={back} alt="" />
                <h1 className='flex justify-center'>New order</h1>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-[20px]'>Deliver to</h2>
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <img className='object-contain w-5' src={ubication} alt="" />
                            <p className='flex gap-1 text-[14px] font-bold'>{userData && userData.address}</p>
                        </div>
                        <img className='object-contain' src={next} alt="" />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-[20px]'>Payment</h2>

                    <div className='flex gap-4'>
                        {userCards.length > 0 && (
                            userCards.map((card, index) => (
                                <button
                                    key={index}
                                    className={`bg-${selectedPaymentMethod === card.cardName ? 'yellow-300' : 'gray-100'} flex gap-2 rounded-md items-center text-[10px] w-[150px] justify-center`}
                                    onClick={() => handlePaymentMethodSelect(card.cardName)}
                                >
                                    <img
                                        className='w-6'
                                        src={card.cardName.toLowerCase() === 'visa' ? visa : master}
                                        alt=''
                                    />
                                    {card.cardName}
                                </button>
                            ))
                        )}
                        <button
                            className={`bg-gray-100 flex gap-2 rounded-md py-2 items-center text-[10px] w-[150px] justify-center`}
                            onClick={goToCard}
                        >
                            Add New Card
                        </button>
                    </div>
                </div>

                {quantity > 0 && (
                    <div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4 items-center '>
                                <img className='w-[44px] h-[44px] object-cover rounded-md' src={dish?.image} alt={dish?.name} />
                                <div className='bg-gray-100 w-[40px] flex justify-center gap-4 px-8 rounded-[10px] text-[12px]'>
                                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => handleQuantityChange(1)}>+</button>
                                </div>
                                <span>{dish?.name}</span>
                            </div>
                            <span className='text-gray-400'>{`$ ${dish?.price.toFixed(2)}`}</span>
                        </div>
                    </div>
                )}

                <div className='flex flex-col gap-2'>
                    <h2 className='text-[20px]'>Note</h2>
                    <input
                        className='border-[1px] rounded-md p-2 border-gray-400 w-[100%]'
                        type="text"
                        placeholder='Write something'
                        value={note}
                        onChange={handleNoteChange}
                    />
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <span>Products </span>
                    <span>$ {totalProducts.toFixed(2)} </span>
                </div>
                <div className='flex justify-between'>
                    <span> Additional Ingredients </span>
                    <span>$ {totalIngredients} </span>
                </div>
                <div className='flex justify-between'>
                    <span>Delivery</span>
                    <span>$ {delivery} </span>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <span>Total</span>
                    <span className='text-[18px]'>$ {totalOrder} </span>
                </div>
                <div className='order relative flex flex-col gap-[4rem] m-6 text-[14px] font-semibold'>
                    {userHasInfo ? (
                        <button
                            className={`bg-${isOrderButtonDisabled || quantity === 0 ? 'yellow-100' : 'yellow-300'}  w-[100%] rounded-md p-2`}
                            disabled={isOrderButtonDisabled || quantity === 0}
                            onClick={goToHome}
                        >
                            {quantity === 0 ? 'No products added' : 'Order'}
                        </button>
                    ) : (
                        <button
                            className={`bg-yellow-300  w-[100%] rounded-md p-2`}
                            onClick={() => navigate('/profile-edit')}
                        >
                            Add User Info
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Order;