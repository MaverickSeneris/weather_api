import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
      {children}
    </div>
  );
};

export default Card;
