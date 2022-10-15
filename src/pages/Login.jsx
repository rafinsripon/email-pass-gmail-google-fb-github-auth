import React, { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import banner from '../image/i-3.jpg'
import ResetPassword from '../components/ResetPassword';
import { ProfileContext } from '../components/Main';

const Login = () => {
    const [user, setUser] = useContext(ProfileContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth(app);

    //Handle Email
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const userInfo = userCredential.user;
            console.log(userInfo)
            Swal.fire(
                "Log In Success!"
              )
              navigate('/profile');
            //---------
            setUser(userInfo)
            
        })
        .catch((error) => {
            const errorMessage = error.message;
            // console.log(errorMessage);
            setError(errorMessage);
        });

    }
    return (
        <div className='px-24 grid grid-cols-2 gap-6'>
            <div>
                <img className='w-full' src={banner} alt="" />
            </div>
            <form onSubmit={handleLogin}>
            <div className='w-2/3 mx-auto mt-28'>
            <h2 className='text-4xl font-extrabold text-gray-500 mb-10'>Well Come Back Here</h2>
            <label className="block mb-6">
            <p className='text-red-600'>{error}</p>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                    </span>
                    <input onBlur={handleEmail}  type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1 text-black" placeholder="Enter Your Email" required/>
                    <p className='text-red-600'></p>
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                    </span>
                    <input onBlur={handlePassword} type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1 text-black" placeholder="Enter Your password" required/>
                    <p className='text-red-600'></p>
                </label>
                <div className='flex justify-between items-center mt-4'>
                <label className="">
                <input type="checkbox" name='checkbox' className="checked:bg-blue-600 w-4 h-4 mr-3 " />Remember Me </label>
                {/* <Link className='underline text-pink-600'>Forget Password</Link> */}

                <label htmlFor="my-modal" className="btn modal-button bg-inherit hover:bg-inherit border-0 m-0 text-pink-600 underline">Forget Password</label>
                </div>
                <button type="submit" className='bg-pink-600 px-20 py-2 rounded-lg text-white font-semibold mt-8'>Log in</button>
                <p className='mt-3 font-bold'>Don’t have a account?? <Link className='font-bold text-rose-600 underline' to='/register'>Register</Link> </p>
                </div>
            </form>
            <ResetPassword />
        </div>
    );
};

export default Login;