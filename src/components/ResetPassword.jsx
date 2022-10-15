import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import app from '../firebase/firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const auth = getAuth(app);

    //reset your password
    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            Swal.fire(
                "Password Reset Please Check your Email!"
              )
        })
        .catch((error) => {
            const errorMessage = error.message;
            // ..
            console.log(errorMessage)
        });
    }
    return (
        <div className=''>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box bg-gray-200 text-gray-700">
                <h3 className="font-bold text-2xl">Forget Password</h3>
                <p className="py-4">Reset Your Password</p>
                <input onBlur={(e) => setEmail(e.target.value)} type="email" name='email' placeholder="Enter your Email" className="input input-bordered input-secondary w-full max-w-xs bg-inherit text-black" required />
                <div className="modal-action">
                <label onClick={handleResetPassword} htmlFor="my-modal" className="btn bg-pink-600 border-0 py-1 px-8 rounded-lg">Update</label>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ResetPassword;