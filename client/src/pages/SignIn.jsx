import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userslice'

export default function Signin() {

    const [formData, setFormData] = useState({});
    const {loading, error: errorMessage} = useSelector(sate => sate.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value.trim()});
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!formData.email || !formData.password){
        return dispatch(signInFailure("please fill all fields"));
      }

      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false) {
          dispatch(signInFailure(data.message));
        }

        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    };

  return (
    <div className=" min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8">
        {/* left side  */}
        <div className=" flex-1">
          <Link 
          to="/" 
          className=" font-bold dark:text-white text-4xl"
          >
            <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500     to-pink-500 rounded-lg text-white">Max's</span>
            Blog
          </Link>
          <p className=" text-sm mt-5">
            Welcome back! Sign in securely to access your account. Unlock personalized experiences and seamless connectivity. Let's continue your journey together!
          </p>
        </div>
        {/* right side  */}
        <div className=" flex-1">
          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email"/>
              <TextInput type="email" placeholder="max@gmail.com" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password"/>
              <TextInput type="password" placeholder="password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : "Sign Up"
              }
            </Button>
          </form>
          <p className=" text-sm mt-5">
            Don't have an account?
             <Link to="/signup" className=" text-blue-600">Sign Up</Link>
          </p>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
        
      </div>
    </div>
  )
}
