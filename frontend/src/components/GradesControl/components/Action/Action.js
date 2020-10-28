import React from 'react';

const Action = ({ type, id, onActionClick }) => {
  const handleClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      {type}
    </span>
  );
};

export default Action;
