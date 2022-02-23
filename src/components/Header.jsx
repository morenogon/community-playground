import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';

// styles
import '../styles/Header.scss';

// components
import Button from './Button';
import { toast } from 'react-toastify';

const Header = () => {
  const auth = getAuth();

  const dispatch = useDispatch();

  const logoutOfApp = () => {
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
        <Button type="primary" title="Sign out" LeftIcon={LogoutIcon} onClick={logoutOfApp} />
      </div>
    </div>
  );
};

export default Header;
