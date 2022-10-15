import app from '../firebase/firebase';
import banner from '../image/i-4.jpg'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGit, } from "react-icons/fa";
import { ProfileContext } from '../components/Main';
import UseFirebase from '../firebase/UseFirebase';


const Register = () => {
    const [user, setUser] = useContext(ProfileContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassworrd] = useState('');
    const [error, setError] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const auth = getAuth(app);

    //google sign in
    const {handleGoogleSignIn, handleGitHubLogIn, handleFacebookLogIn} = UseFirebase();

    //name Validation
    const handleName = (e) => {
        setName(e.target.value)
      };

    //Email Validation
    const handleEmail = (e) => {
        const email = /\S+@\S+\.\S+/.test(e.target.value);
        // console.log(email)
        if(!email){
            setErrorEmail('Please Enter the Valid Email');
            return;
        }
        setEmail(e.target.value);
        setErrorEmail('')
    }
    //password validation
    const handlePassword = (e) => {
        if(!/(?=.{8,})/.test(e.target.value)){
            // console.log(e.target.value);
            setErrorPassworrd('plese Password Atleast 8 character');
            return;
        }
        setPassword(e.target.value);
        setErrorPassworrd('')
        // console.log(e.target.value);
    }

    //Register Button
    const handleRegister = (e) => {
        e.preventDefault()
        if((name, email, password)){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const userInfo = userCredential.user;
                // console.log(userInfo);
                updateUserName();
                e.target.reset()
                verifyEmail();
                setError('')
                //----------
                setUser(userInfo)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
                // console.log(errorMessage);
            });
        }
        else{
            setError('Plz provide a valid info')
            return;
        }
    } 
    //update user name
    const updateUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
        .then(() => {
            //profile updated
        })
        .catch((error) => {
            //an Error occurred
        })
    }
    //varify email
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            toast('Check Your Email Address', {autoClose: 500});
        })
    }
    return (
        <div className='px-24 grid grid-cols-2 gap-6'>
            <div>
                <img className='w-full' src={banner} alt="" />
            </div>
            <form onSubmit={handleRegister}>
                <div className='w-[80%] mx-auto mb-10 mt-6'>
                    <h2 className='text-4xl font-extrabold text-gray-500'>Hello There, <br /><span className='text-2xl font-bold text-gray-600'>Register now to explore more</span> </h2>
                    {/* ========sign up gooole and git hub */}
                <div className="otherLogin mt-2 mb-3 flex items-center gap-4">
                    <button onClick={handleGoogleSignIn} className='border-2 text-base border-pink-600 rounded-lg py-4 px-6 flex items-center font-semibold'> <span className='block text-2xl mr-2'><FcGoogle /></span></button>
                    <button onClick={handleGitHubLogIn} className='border-2 text-base border-pink-700 rounded-lg py-4 px-6 flex items-center font-semibold'> <span className='block text-2xl mr-2'><FaGit className='text-rose-500' /></span></button>
                    <button onClick={handleFacebookLogIn} className='border-2 text-base border-pink-700 rounded-lg py-4 px-6 flex items-center font-semibold'> <span className='block text-2xl mr-2'><FaFacebookF className='text-cyan-600' /></span></button>
                </div>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Full Name
                    </span>
                    <input onBlur={handleName} type="text" name="name" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1 text-black" placeholder="Enter Your full name" required/>
                    
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                    </span>
                    <input onBlur={handleEmail}  type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1 text-black" placeholder="Enter Your Email" required/>
                    <p className='text-red-600'>{errorEmail}</p>
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                    </span>
                    <input onBlur={handlePassword} type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1 text-black" placeholder="Enter Your password" required/>
                    <p className='text-red-600'>{errorPassword}</p>
                </label>
                <p className='text-rose-500 font-bold mb-3'>{error}</p>
                
                <label className="">
                <input onClick={() => setIsDisable(!isDisable)} type="checkbox" name='checkbox' className="checked:bg-blue-600 w-4 h-4 mr-3 text-black"  />
                I agree toTerms and conditions & Privacy Policy</label>

                <button disabled={isDisable} type="submit" className='bg-pink-600 px-20 py-2 rounded-lg text-white font-semibold mt-8'>Register</button>
                <p className='mt-3 font-bold'>Already have a account? <Link className='font-bold text-rose-600 underline' to='/login'>Log In</Link> </p>
                </div>
            </form>
        </div>
    );
};

export default Register;