import React, { useState } from 'react';
import banner from '../image/i-2.jpg'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../firebase/firebase';
import { toast } from 'react-toastify';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)
    const auth = getAuth(app);
    const handleName = e => {
        // e.preventDefault()
        setName(e.target.value);
        console.log(e.target.value)
    }
    // Email validation
    const handleEmail = e => {
        // event.preventDefault()
        const email = /\S+@\S+\.\S+/.test(e.target.value);
        if(!email){
            setEmail('Please Enter the Valid Email');
            return;
        }
        setEmail(e.target.value);
        setEmail('')
    }
    //Password Validation
    const handlePassword = (e) => {
        if(!/(?=.{8,})/.test(e.target.value)){
            setPassword('plese Password Atleast 8 character');
            return;
        }
        if(!/(?=.*[A-Z])/.test(e.target.value)){
            setPassword('Please Provide Atleast One Uppercase');
            return;
        }
        if(!/(?=.*[!#$@%&? "])/.test(e.target.value)){
            setPassword('Please At Lest One Speacial Characters');
            return;
        }
        setPassword(e.target.value);
        setPassword('')
        console.log(password);
    }
    const handleClick = (e) => {
        e.preventDefault();
        // setSuccess(false)
        if((name, email, password)){
            createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                toast('🦄 Wow Success!', {autoClose: 500})
                console.log(user)
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
                console.log(error);
            })
        }
        else{
            setError('Please Fill All Input Field')
            return;
        }
        
    }

    return (
        <div className='bg-stone-100 px-24 grid grid-cols-2 gap-6'>
            <div>
                <img className='w-full' src={banner} alt="" />
            </div>
            <form>
                <div className='w-2/3 mx-auto mt-28'>
                    <h2 className='text-4xl font-extrabold text-gray-500 mb-10'>Register Now</h2>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Full Name
                    </span>
                    <input onBlur={handleName} type="text" name="name" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Your full name" required/>
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                    </span>
                    <input onBlur={handleEmail} type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Your Email" required/>
                    <p className='text-rose-400'>{email}</p>
                </label>
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                    </span>
                    <input onBlur={handlePassword} type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-pink-500 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-600 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Your password" required/>
                    <p className='text-rose-400'>{password}</p>
                </label>
                <p className='text-rose-500 font-bold'>{error}</p>
                <button onClick={handleClick} type="submit" className='bg-green-600 px-20 py-2 rounded-lg text-white font-semibold mt-8'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;