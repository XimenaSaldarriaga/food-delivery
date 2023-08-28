import { getAuth ,createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext } from 'react';
import { app } from '../firebase'

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
}

export function AuthProvider({ children }) {
  const signUp = async (email, password) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }


  return (
    <authContext.Provider value={{ signUp }}>
      {children}
    </authContext.Provider>
  );
};
