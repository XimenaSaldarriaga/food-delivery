import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail  } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs, addDoc, deleteDoc, setDoc, getDoc  } from "firebase/firestore";
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
      const orders = ordersQuerySnapshot.docs.map((doc) => ({ orderId: doc.id, ...doc.data() }));
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

export function updateProfileImage(userEmail, newProfileImg) {
  const usersCollectionRef = collection(db, "users");
  const queryUser = query(usersCollectionRef, where("email", "==", userEmail));

  return getDocs(queryUser)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);

        return updateDoc(userRef, {
          profileImg: newProfileImg,
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
  const [currentOrder, setCurrentOrder] = useState(null); 
  const dispatch = useDispatch();
  const [isCardButtonVisible, setCardButtonVisible] = useState(() => {
    const storedValue = localStorage.getItem('isCardButtonVisible');
    return storedValue ? JSON.parse(storedValue) : false;
  });

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


  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const userDocRef = doc(db, 'users', user.uid);
      const existingUserDoc = await getDoc(userDocRef);
  
      if (existingUserDoc.exists()) {
        const userData = existingUserDoc.data();
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User logged in with Google successfully');
      } else {
        await setDoc(userDocRef, {
          email: email,
          name: displayName,
          profileImg: photoURL,
        });
  
        const userData = {
          email: email,
          name: displayName,
          profileImg: photoURL,
        };
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User logged in with Google successfully and account created in Firestore');
      }
  
      return true;
    } catch (error) {
      console.error('Error logging in with Google:', error);
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
          setCurrentOrder(orderData);
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
        } else {
          console.error('User not found in Firestore');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('User not authenticated');
    }
  };

  const deleteCard = async (userEmail, cardNumber) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(query(usersCollection, where('email', '==', userEmail)));
      
      if (!querySnapshot.empty) {
        const userId = querySnapshot.docs[0].id;
        const cardsCollectionRef = collection(db, 'users', userId, 'cards');
        const queryCard = query(cardsCollectionRef, where('cardNumber', '==', cardNumber));
        const cardQuerySnapshot = await getDocs(queryCard);
  
        if (!cardQuerySnapshot.empty) {
          const cardId = cardQuerySnapshot.docs[0].id;
          const cardRef = doc(cardsCollectionRef, cardId);
          await deleteDoc(cardRef);
        } else {
          console.error('Card not found in Firestore');
        }
      } else {
        console.error('User not found in Firestore');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  };
  
  

  return (
    <authContext.Provider value={{ isCardButtonVisible, setCardButtonVisible, signUp, fetchRestaurants, restaurants, fetchAllMenus, signIn, userData, setUserData, signOut, addOrderToUser, addCardToUser, currentOrder, deleteCard, signInWithGoogle}}>
      {children}
    </authContext.Provider>
  );
};
