import React from 'react';
import '../styles/InputOption.scss';

const InputOption = ({ icon, title }) => {
  return (
    <div className="inputOption">
      <img src={icon} alt="" className="inputoption__icon" />
      {title && <p>{title}</p>}
    </div>
  );
};

export default InputOption;
