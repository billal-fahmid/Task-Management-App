import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { set } from 'react-hook-form';


export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading ,setLoading] = useState(true)

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser =(email , password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email ,password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth,(LoggedInUser) =>{
    //         console.log( 'LOgin user observer',LoggedInUser)
    //         setUser(LoggedInUser)
    //         setLoader(false)
    //     })
    //     return ()=>{
    //         unsubscribe()
    //     }
    // },[])

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(LoginUser)=>{
            console.log('current login user--' , LoginUser )
            setUser(LoginUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }



    const authInfo = {
        createUser,
        signInUser,
        logOut,
        updateUserProfile,
        user,
        loading,
    }

    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;