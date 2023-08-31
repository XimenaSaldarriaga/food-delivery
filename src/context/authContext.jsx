import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { app } from '../firebase';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from '../firebase';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
}
  export const getUserByEmail = async (email) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const existingUser = querySnapshot.docs.find((doc) => doc.data().email === email);
      return existingUser;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  };

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

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        console.error('User with this email already exists');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const userData = querySnapshot.docs.find((doc) => doc.data().email === email);

      if (userData) {
        console.log('User data from Firestore:', userData.data());
      } else {
        console.log('User data not found in Firestore');
      }

      console.log('User logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  const fetchAllMenus = async () => {
    try {
      const db = getFirestore();
      const restaurantsCollectionRef = collection(db, "restaurants");
      const restaurantsQuerySnapshot = await getDocs(restaurantsCollectionRef);

      const allMenus = [];

      for (const restaurantDoc of restaurantsQuerySnapshot.docs) {
        const restaurantData = restaurantDoc.data();
        const menuCollectionRef = collection(db, 'restaurants', restaurantDoc.id, 'menu');
        const menuQuerySnapshot = await getDocs(menuCollectionRef);
        const menuData = menuQuerySnapshot.docs.map((doc) => doc.data());

        allMenus.push({
          restaurantId: restaurantDoc.id,
          menuData: menuData
        });
      }

      return allMenus;
    } catch (error) {
      console.error("Error fetching menus:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchAllMenus()
      .then(menus => {
        console.log('All Menus:', menus);

      })
      .catch(error => {
        console.error('Error fetching all menus:', error);
      });
  }, []);

  return (
    <authContext.Provider value={{ signUp, fetchRestaurants, restaurants, fetchAllMenus, signIn }}>
      {children}
    </authContext.Provider>
  );
};
