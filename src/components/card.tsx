import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-16 bg-opacity-50">
      {children}
    </div>
  );
};

export default Card;
