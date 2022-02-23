import React, { useEffect, useState } from 'react';
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
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

// data
import db from './firebase/firebase.config';

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [userName, setUserName] = useState('');
  const [quote, setQuote] = useState('');

  // listen for when authentication state is changed - persistent authentication
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        getUserData(authUser.uid);

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
    if (userName) {
      dispatch(
        login({
          ...user,
          userName: userName,
        })
      );
    }
  }, [userName]);

  useEffect(() => {
    if (quote) {
      dispatch(
        login({
          ...user,
          quote: quote,
        })
      );
    }
  }, [quote]);

  const getUserData = (userId) => {
    const queryUsers = query(collection(db, 'users'));

    onSnapshot(queryUsers, (snapshot) => {
      snapshot.docs.map((user) => {
        if (user.id === userId) {
          setUserName(user.data().username);
          setQuote(user.data().quote);
        }
      });
    });
  };

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
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default App;
