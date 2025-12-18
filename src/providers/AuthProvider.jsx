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
import axios from "axios";

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
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  // 🔹 Existing (keep it)
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // ✅ NEW: Update ONLY user name (Firebase + Backend)
  const updateUserName = async (name) => {
    if (!auth.currentUser) return;

    // 1️⃣ Firebase Auth update
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    // 2️⃣ Backend update (MongoDB)
    const token = localStorage.getItem("access-token");

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/profile`,
      { name },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    // 3️⃣ Update local state (instant UI update)
    setUser((prev) => ({
      ...prev,
      displayName: name,
    }));
  };

  // 🔹 Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("access-token", token);

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/role`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          setUser({
            ...currentUser,
            role: response.data.role,
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser(currentUser);
        }
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Expose updateUserName
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
    updateUserName, // 🔥 ADDED
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
