import React from 'react';

export default function Button({
  onClick,
  className,
  type = 'button',
  children,
}) {
  return (
    <button
      className={`py-2 px-4 hover:bg-blue-300 cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
