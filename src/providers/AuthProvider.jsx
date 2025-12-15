import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios"; // ✅ Import axios

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("access-token"); // ✅ Clear token on logout
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange with Role Fetching ✅
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser?.email);

      if (currentUser) {
        // Get Firebase token
        const token = await currentUser.getIdToken();
        localStorage.setItem("access-token", token);
        console.log("Token saved to localStorage");

        // Fetch user role from backend ✅
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/role`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("User Role from API:", response.data.role);

          // Set user with role ✅
          setUser({
            ...currentUser,
            role: response.data.role,
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Set user without role if API fails
          setUser(currentUser);
        }
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
