import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Header from './components/Header';
import Body from './components/Body';
import { selectUser, login, logout } from './features/userSlice';
import Login from './components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  // listener - persistent authentication
  useEffect(() => {
    debugger;
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    console.log(user);
    debugger;
  }, [user]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div>
          <Header />
          <Body />
        </div>
      )}
      <ToastContainer position="top-bottom" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default App;
