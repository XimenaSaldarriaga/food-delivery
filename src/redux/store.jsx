import { configureStore } from '@reduxjs/toolkit';
import authReducer from './taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default store;
