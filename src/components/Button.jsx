import React from 'react';
import '../styles/Button.scss';
import { Avatar } from '@nextui-org/react';

const Button = ({ type, LeftIcon, RightIcon, avatar, title }) => {
  return (
    <div className={type && type === 'post' ? 'button button-post' : 'button'}>
      {LeftIcon && <LeftIcon className="button__left-icon" />}
      {avatar && <Avatar src={avatar} size="sm" />}
      <h3>{title ? title : 'Me'}</h3>
      {RightIcon && <RightIcon className="button__right-icon" />}
    </div>
  );
};

export default Button;
