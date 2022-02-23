import React, { useState, useRef, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../styles/Login.scss';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import { toast } from 'react-toastify';
import db from '../firebase/firebase.config';
import { doc, setDoc, query, collection, onSnapshot } from 'firebase/firestore';

const Login = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [quote, setQuote] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector(selectUser);

  // Register new user with email and password in Firebase
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        const user = userAuth.user;

        // Add a new document in collection "users"
        setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          username: userName,
          quote: quote,
        });

        updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL: profilePic,
        })
          .then(() => {
            // Profile updated!
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: fullName,
                photoUrl: profilePic,
              })
            );

            toast.success('🦄 You have signed up!');
          })
          .catch((error) => {
            toast.warn(error.code);
          });
      })
      .catch((error) => {
        toast.warn(error.code);
      });

    resetForm();
  };

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        // Signed in
        getUserData(userAuth.user);
      })
      .catch((error) => {
        toast.warn(error.code);
      });
  };

  const getUserData = (userLogged) => {
    const queryUsers = query(collection(db, 'users'));

    onSnapshot(queryUsers, (snapshot) => {
      snapshot.docs.map((user) => {
        if (user.id === userLogged.uid) {
          dispatch(
            login({
              email: userLogged.email,
              uid: userLogged.uid,
              displayName: userLogged.displayName,
              photoUrl: userLogged.photoURL,
              userName: user.data().username,
              quote: user.data().quote,
            })
          );
        }
      });
    });
  };

  const googleAuth = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        debugger;
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => {
        // Handle Errors here.
        toast.warn(error.code);
      });
  };

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const resetForm = () => {
    setFullName('');
    setUserName('');
    setQuote('');
    setUserName('');
    setProfilePic('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login">
      <div className={!isRegistered ? 'login__container login__container-register' : 'login__container'}>
        <div>
          <h1 className="login__title">Playground Community</h1>
          <div className="login__form">
            <form>
              {!isRegistered && (
                <label>
                  Full name
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
              )}
              {!isRegistered && (
                <label>
                  User name
                  <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>
              )}
              {!isRegistered && (
                <label>
                  Profile picture
                  <input type="text" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
                </label>
              )}
              {!isRegistered && (
                <label>
                  Quote
                  <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} />
                </label>
              )}
              <label>
                Email
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="login__password-label">
                Password
                <input type={passwordShown ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="login__password-icon" onClick={togglePassword}>
                  {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </label>
              <p className="login__forgot">Forgot Password?</p>
              {isRegistered && (
                <button className="login__login-btn" type="button" onClick={loginToApp}>
                  Sign in
                </button>
              )}
              {!isRegistered && (
                <button className="login__login-btn" type="button" onClick={register}>
                  Sign up
                </button>
              )}
              <p className="login__continue">or continue with</p>
              <div className="login__btn-container">
                <button className="login__btn" type="button" onClick={googleAuth}>
                  <img
                    src="data:image/png;base64,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"
                    alt="google icon"
                  />
                </button>
                <button className="login__btn" type="button">
                  <img
                    src="data:image/png;base64,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"
                    alt="github icon"
                  />
                </button>
                <button className="login__btn" type="button">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEUYd/L///8hevIAb/EAbfGowvkAbPHH1/sAcfK90foRdfIAcvLr8f3z+P4ZePK20PomfvPf6/00hfN3qPbM3/yXufhqofZGj/Tt9f75/P+vy/o7iPObv/jI2/tnnvYugfN5q/fT5PxypPbd6P1amPWFsfepx/lPk/SOtvhIjfS91vvapNLlAAAFyElEQVR4nO3daXPbIBAGYCQUhSIrurFlO859NP//Bxb5iO36iHxsdmH2/dCZZhqVZ0D3IkRwKG2RNWZYhneCcu7CcmiarGgPOsT+Hw/GJoxlorXGJvwY28ZExqEZD04Q3hthddhNPylWKWb3PYVZ6RpvEYsssx7CehK5yFtER5P6B2FaOezroqPn9JiwzhV2Ey+OyuvDwqnjHbiIjqaHhFWM3bgrJar2C02E3bKrJTL7hMb9XXAdNdsVVv70YJf1QF0Jp77sg6t8H26WwtqvHuwS1ZvCNPfhNLEdnacbwsqno8wqqloLPRyjXRbjdC6c+DdGu+jJSpj52YW2E7OlsPSzC20nlgvhvcRuCVjk/Vw4S7AbApZk1gkHwtdBaoepGFjh2N9Baofp2AqNv4PUDlMTiDb0d5DaYRq2ovDtpmI7cSEyn3dDuyNmovF5N7Q7YiOMz7uh3RGNGHouHApvL0oX0aUIsdsAnFzQfgF6eXz3cTgcDofjUvQq2A25fnSipEySpS9Jur9KpbqfYDftCkmkyj8eb26fitGyLK1NB8VTffvePM7+lrmOpHKydmkenUT58/jlv9qXzbSjoh5/Pn/kTt6i6yh5qw+XE25Lx+69+kvUcE/92cH8ce1JkpavO7VnPgn31dZ5JdTRzYk+x4RqeKCQ1xdh/Ha6zyWhjt7PATokVF9nAZ0RarW3ztwjYfznTKArwnj6M8Vpoap+ljgt1JOel9nOCqOn84FOCNVZZ3qHhDq/YIw6IYxOuRt0UbgogvRZKC/rQvpC/XAZkL5QNb4L45HnQv1xIZC8UI69F146SKkL9fBSIHWh+jzR06ajwVZG77SF0SnPLtq6eZ2EiYy3QhvYlZL3zeDtQSrn3pLqsu9tRfsWO/muUL/2BL48uPcObZ6k571v7WT/dVH9zveFchU4n3j0c1qHy3iTpz7ChvYJ4Vi0LnoARw7PvNKiz1Xp1NHDaBct+pwOH9ztQqHvegDdnpfUR+j29MCwh/DNyaKnVfoIPxzeDfsJHT7di37CHLuRF6WP0O15SSxkIf2wkIX0w0IW0g8LWUg/LGQh/bCQhfTjhzCRspu8u/pznW6Gbw9hsvHvdzci8Z/EJY83R9JDeOzXbfA/PXpSPckZ+YsvvAUFpvhfzAMWDvA/Hwss/PJeOMV/9wYsfMR/9wYsJPDFPGAhgToNWGFK4CU/rPAJ/1AKLKRQxgAr/CRQTQQrfMU/0AALKdRLgQpTAicLWOEL/hUNsJDEqgagQgLX3cDCyvtRSqLmDVKYUjhZgApprL0BKaRw3Q0rpHDdDSukcN0NK6SxyA+kEP+JfhdAYUtjtiWgkMhMDEAhgefdXQCFNyROFt+rYQKExHW3jYoOJlY9HCo+9OtEgEfTZ96T22ts+FGpcCwsZCH9sJCF9MNCFtIPC1lIPyxkIf2wkIX0w0IW0g8LWUg/LGQh/bCQhfTDQhbSDwtZSD8sZCH9sJCF9ENBCFs3hy+8E7DbxxfmAvZr2uhCXQrYrzLgC4fCeC40ogEtNUYXqkZkoPXw6EKZCdhZG+jCuBAt6Jem0IVhKwIDuSNiCxMTCNhZjNhCObZC0Lm2yMJucUIBO40RWZjMgk4I+WUGZGG37JsVQi70givUZbAQZnDT/HCFcbYUAk63RRUulq2fC2uwTkQVyvpbGFRQ894xhaoK1sI0BxqniEKdpxtCsHGKKFzN3l0KgynMLQaeMJ4G28KgAulFNGFUrTb/LQwMxNEGS6jM9+bXwsAA9CKSMJqtN78hhBioOMK42tj8pjCYRtc+aWAIdTTd3PyWMKjzK++MCEKVb3/kYVsYpNV1u/HXhVpW6fbmxf//Xz2Jr2j8ZaGOJjtf6dgRBsFXKa+2lvtvCnUiy2x383uEth+NuBLy14SWJ2Z71zDYKwyCwdiEsVT60s8Y/YLQtlHJODTjwf7NHxDatEXWmGGZX/QKFVx4F5ZD02TF4fW//wEPh1cWklnG+AAAAABJRU5ErkJggg=="
                    alt="facebook icon"
                  />
                </button>
              </div>
              {isRegistered && (
                <p className="login__register">
                  Don’t have an account yet? <span onClick={() => setIsRegistered(false)}>Register for free</span>
                </p>
              )}
              {!isRegistered && (
                <p className="login__register">
                  Already a member? <span onClick={() => setIsRegistered(true)}>Sign in here</span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
