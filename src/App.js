import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Header from './components/Header';
import Body from './components/Body';
import { selectUser } from './features/userSlice';
import Login from './components/Login';

const App = () => {
  const user = useSelector(selectUser);
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
    </div>
  );
};

export default App;
