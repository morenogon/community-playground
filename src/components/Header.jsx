import React from 'react';
import '../styles/Header.scss';
import Button from './Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="linkedin logo"
        />
      </div>
      <div className="header__right">
        <Button
          type="primary"
          title="Name Surname"
          RightIcon={ExpandMoreIcon}
          avatar="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        />
      </div>
    </div>
  );
};

export default Header;
