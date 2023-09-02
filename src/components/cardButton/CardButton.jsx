import { useAuth } from '../../context/authContext';

const CardButton = ({ onClick }) => {

  const { currentOrder } = useAuth();
 
return (
  <button onClick={onClick} className='bg-yellow-300 py-3 px-6 rounded-md flex justify-between text-[12px] items-center cursor-pointer fixed w-[94%] bottom-16 self-center'>
    <span className='text-[10px] text-white px-1 rounded-[2px] bg-slate-600'>{currentOrder ? currentOrder.quantity : 0} </span>
    <span className='font-semibold text-[14px]'>View card</span>
    <span>$ {currentOrder ? currentOrder.totalCost : 0}</span>
  </button>
);
}

export default CardButton;
