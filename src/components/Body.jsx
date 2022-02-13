import React from 'react';
import '../styles/Body.scss';
import Feed from './Feed';
import Sidebar from './Sidebar';

const Body = () => {
  return (
    <div className="body">
      <Sidebar />
      <Feed />
      {/* Widgets */}
    </div>
  );
};

export default Body;
