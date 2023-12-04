import React from 'react';

const ErrorCard = ({ title, message }) => {
  return (
    <div className="error-card">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorCard;