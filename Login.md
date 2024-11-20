import React from "react";
import { Fingerprint, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
// auth-step-3
import { signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function createUser(authData) {
  const userObject = authData.user;
  const { uid, photoURL, displayName, email } = userObject;
  const date = new Date();
  const timeStamp = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  await setDoc(doc(db, "users", uid), {
    email,
    profile_pic: photoURL,
    name: displayName,
    lastSeen: timeStamp,
  });
}

function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const userData = await signInWithPopup(auth, new GoogleAuthProvider());
    await createUser(userData);
    console.log("Login excuted");
    navigate("/");
  };
  return (
    <>
      {/* Header Section */}
      <div className="h-[220px] bg-Green flex items-center justify-center">
        <div className="text-center">
          <img
            src="/src/components/whatsapp.svg"
            alt="WhatsApp Logo"
            className="w-16 h-16 mx-auto"
          />
          <div className="text-white text-2xl font-bold mt-2">WhatsApp🙋🏻‍♀️</div>
        </div>
      </div>

      {/* Sign In Section */}
      <div className="h-[calc(80vh-220px)] flex justify-center mt-10 relative">
        <div className="text-center bg-white h-[140%] w-[70%] shadow-2xl absolute -top-[93px]">
          {/* Fingerprint Icon with Green Color */}
          <div className="flex justify-center items-center mb-8">
            <Fingerprint className="w-16 h-16 text-Green mt-6" />
          </div>
          <div className="text-3xl font-bold mb-4">Sign In</div>
          <div className="text-gray-600 mb-6">
            Sign in with your Google account to get started
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow flex items-center space-x-2"
            >
              <span>Sign in with Google</span>
              <LogIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
