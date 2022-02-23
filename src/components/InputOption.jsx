import React from 'react';
import '../styles/InputOption.scss';

const InputOption = ({ Icon, title, color }) => {
  return (
    <div className="inputOption">
      {Icon && <Icon className={color} />}
      {title && <p>{title}</p>}
    </div>
  );
};

export default InputOption;
