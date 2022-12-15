import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userName, setuserName] = useState(null);
    const [userPhoto, setuserPhoto] = useState(null);
    const [userId, setuserId] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setuserName(user.displayName);
                setuserPhoto(user.photoURL);
                setuserId(user.uid)
                console.log(user)
            }
        })
        return () => {
            unsub();
        }
    }, []);

    const value = {
        userName,
        userPhoto,
        userId,
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}