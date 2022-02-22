import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { getAuth, signOut } from 'firebase/auth';

// styles
import '../styles/Header.scss';

// components
import Button from './Button';
import { toast } from 'react-toastify';

const Header = () => {
  const auth = getAuth();

  const dispatch = useDispatch();

  const logoutOfApp = () => {
    debugger;
    dispatch(logout());

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('Sign-out successful');
      })
      .catch((error) => {
        // An error happened.
        toast.warn('An error happened');
      });
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedin logo" />
      </div>
      <div className="header__right">
        <Button
          type="primary"
          title="Sign out"
          avatar="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          onClick={logoutOfApp}
        />
      </div>
    </div>
  );
};

export default Header;
