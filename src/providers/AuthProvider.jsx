import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosPublic = useAxiosPublic()
    
    const googleProvider = new GoogleAuthProvider();

    
    
    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // update profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
            

        })
        
    }

    // logout user
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                    }
                })

            }
            else {
                // TODO: remove token (if token stored in client side: local storage, caching, in memory)
                localStorage.removeItem('access-token')
            }
            setLoading(false);
            console.log('in auth state', currentUser);
            
        })
        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])




    const authInfo = {

        user,
        loading,
        setLoading,
        createUser,
        updateUserProfile,
        loginUser,
        googleLogin,
        logOut,
        
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;