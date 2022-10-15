import { getAuth, signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProfileContext } from '../components/Main';
import app from '../firebase/firebase';

const Profile = () => {
    const [user, setUser] = useContext(ProfileContext);
    const auth = getAuth(app);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setUser({});
            navigate('/');
            toast('Sign Out Success!', {autoClose: 500});
        })
        .catch((error) => {
            setUser({})
            console.log("SignOut Error", error);
        });
    }
    return (
        <div className=' bg-gray-700'>
            <div className="border-2 border-pink-700 mb-20 w-[70%] mx-auto py-32 text-center">
            <h2 className='text-4xl font-bold'>User Name: {user?.displayName}</h2>
            <p className='text-2xl'>User Email: {user?.email}</p>
            <button onClick={handleSignOut} className='bg-pink-600 rounded-lg py-2 px-10 mt-6'>Sign Out</button>
            </div>
        </div>
    );
};

export default Profile;