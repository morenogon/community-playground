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
          avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/2048px-Google_Chrome_icon_%28September_2014%29.svg.png"
        />
      </div>
    </div>
  );
};

export default Header;
