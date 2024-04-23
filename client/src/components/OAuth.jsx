import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../filebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userslice";
import { useNavigate } from "react-router-dom";


export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <FcGoogle className="w-6 h-6 mr-2"/>
        Sign in with Google
    </Button>
  )
}