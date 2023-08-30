import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { app } from '../firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    return context;
}

export function AuthProvider({ children }) {
    const db = getFirestore();
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const restaurantsCollection = collection(db, "restaurants");
            const querySnapshot = await getDocs(restaurantsCollection);
            const restaurantData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
            setRestaurants(restaurantData);

            console.log("Restaurant data fetched:", restaurantData);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

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
        <authContext.Provider value={{ signUp, fetchRestaurants, restaurants }}>
            {children}
        </authContext.Provider>
    );
};
