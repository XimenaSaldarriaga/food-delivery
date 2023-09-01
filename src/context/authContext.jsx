import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs, addDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from '../firebase';
import { setIsAuthenticated } from '../redux/taskSlice';
import { useDispatch } from 'react-redux';

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

export async function getCardsForUserByEmail(email) {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(query(usersCollection, where('email', '==', email)));
    if (!querySnapshot.empty) {
      const userId = querySnapshot.docs[0].id;
      const cardsCollectionRef = collection(db, 'users', userId, 'cards');
      const cardsQuerySnapshot = await getDocs(cardsCollectionRef);
      const cards = cardsQuerySnapshot.docs.map((doc) => doc.data());
      return cards;
    } else {
      console.error('User not found in Firestore');
      return [];
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
}

export async function getOrdersForUserByEmail(email) {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(query(usersCollection, where('email', '==', email)));
    if (!querySnapshot.empty) {
      const userId = querySnapshot.docs[0].id;
      const ordersCollectionRef = collection(db, 'users', userId, 'orders');
      const ordersQuerySnapshot = await getDocs(ordersCollectionRef);
      const orders = ordersQuerySnapshot.docs.map((doc) => doc.data());
      return orders;
    } else {
      console.error('User not found in Firestore');
      return [];
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}


const db = getFirestore();



export function updateUserName(userEmail, newName) {
  const usersCollectionRef = collection(db, "users");
  const queryUser = query(usersCollectionRef, where("email", "==", userEmail));

  return getDocs(queryUser)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);

        return updateDoc(userRef, {
          name: newName,
        });
      } else {
        throw new Error("Usuario no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al actualizar el nombre:", error);
      throw error;
    });
}

export function updatePhoneNumber(userEmail, newPhoneNumber) {
  const usersCollectionRef = collection(db, "users");
  const queryUser = query(usersCollectionRef, where("email", "==", userEmail));

  return getDocs(queryUser)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);

        return updateDoc(userRef, {
          phoneNumber: newPhoneNumber,
        });
      } else {
        throw new Error("Usuario no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al actualizar el número de teléfono:", error);
      throw error;
    });
}

export function updateAddress(userEmail, newAddress) {
  const usersCollectionRef = collection(db, "users");
  const queryUser = query(usersCollectionRef, where("email", "==", userEmail));

  return getDocs(queryUser)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);

        return updateDoc(userRef, {
          address: newAddress,
        });
      } else {
        throw new Error("Usuario no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al actualizar la dirección:", error);
      throw error;
    });
}


export function AuthProvider({ children }) {
  const db = getFirestore();
  const [restaurants, setRestaurants] = useState([]);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    fetchRestaurants();
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
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
      const userDoc = querySnapshot.docs.find((doc) => doc.data().email === email);

      if (userDoc) {
        const userDataFromFirestore = userDoc.data();
        setUserData(userDataFromFirestore);
        localStorage.setItem('userData', JSON.stringify(userDataFromFirestore));
        console.log('User data from Firestore:', userDataFromFirestore);
        return true;
      } else {
        console.log('User data not found in Firestore');
        return false;
      }
    } catch (error) {
      console.error('Error logging in');
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');

    setUserData(null);
    dispatch(setIsAuthenticated(false));
  };


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

  const addOrderToUser = async (orderData) => {
    if (userData) {
      try {
        const userEmail = userData.email;
        const userRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(userRef, where('email', '==', userEmail)));


        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;
          const ordersCollectionRef = collection(db, 'users', userId, 'orders');
          await addDoc(ordersCollectionRef, orderData);
          console.log('Order added to user successfully');
        } else {
          console.error('User not found in Firestore');
        }
      } catch (error) {
        console.error('Error adding order to user:', error);
      }
    } else {
      console.error('User not authenticated');
    }
  };

  const addCardToUser = async (cardData) => {
    if (userData) {
      try {
        const userEmail = userData.email;
        const userRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(userRef, where('email', '==', userEmail)));
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;
          const cardsCollectionRef = collection(db, 'users', userId, 'cards');
          await addDoc(cardsCollectionRef, cardData);
          console.log('Card added to user successfully');
        } else {
          console.error('User not found in Firestore');
        }
      } catch (error) {
        console.error('Error adding card to user:', error);
      }
    } else {
      console.error('User not authenticated');
    }
  };
  

  return (
    <authContext.Provider value={{ signUp, fetchRestaurants, restaurants, fetchAllMenus, signIn, userData, setUserData, signOut, addOrderToUser, addCardToUser }}>
      {children}
    </authContext.Provider>
  );
};
