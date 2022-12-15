import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {

    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider).then(async (userCredentials) => {
                if (userCredentials.user.metadata.creationTime === userCredentials.user.metadata.lastSignInTime) {
                    await setDoc(doc(db, "userchats", userCredentials.user.uid), {});
                    await setDoc(doc(db, "users", userCredentials.user.uid), {
                        uid: userCredentials.user.uid,
                        displayName: userCredentials.user.displayName,
                        email: userCredentials.user.email,
                        photoURL: userCredentials.user.photoURL
                    })
                }
            })
            localStorage.setItem('Allow', true)
            navigate('/', { replace: true })
        } catch {
            toast.error()
        }
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="loginctn">
                <div className="login">
                    <p>Welcome To Chat App</p>
                    <button onClick={signInWithGoogle} className="loginbtn">Sign In With Google</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LogIn;