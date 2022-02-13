import React from 'react';
import { Avatar } from '@nextui-org/react';
import '../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1619359209643-20df6a2465ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
        <Avatar
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          size="xl"
        />
        <h4 className="sidebar__top-name">Name surname</h4>
        <h5 className="sidebar__top-nickname">@nickname</h5>
        <p className="sidebar__top-quote">✨This is my quote ✨</p>
      </div>
      <div className="sidebar__bottom">
        <div className="sidebar__follow">
          <div className="sidebar__follow-data">
            <h4>6,664</h4>
            <p>Following</p>
          </div>
          <div className="sidebar__follow-data">
            <h4>9,889</h4>
            <p>Followers</p>
          </div>
        </div>
        <p className="sidebar__profile">My Profile</p>
      </div>
    </div>
  );
};

export default Sidebar;
