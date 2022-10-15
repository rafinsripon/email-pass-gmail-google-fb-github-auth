import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import app from './firebase';

const UseFirebase = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            navigate('/profile');
            console.log(user);
        })
        .catch((error) => {
            console.log('Google Sign In Error', error);
        })  
    }
    //handle github Login
    const handleGitHubLogIn = () => {
        signInWithPopup(auth, githubProvider)
        .then((result) => {
            const user = result.user;
            navigate('/profile');
            console.log(user);
        })
        .catch((error) => {
            console.log('Github Sign In Error', error);
        }) 
    }
    //handle Facebook Login
    const handleFacebookLogIn = () => {
        signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const user = result.user;
            navigate('/profile');
            console.log(user);
        })
        .catch((error) => {
            console.log('Github Sign In Error', error);
        })
    }

    return {handleGoogleSignIn, handleGitHubLogIn, handleFacebookLogIn};
};

export default UseFirebase;