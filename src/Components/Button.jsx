import React from 'react';

export default function Button({
  onClick,
  className,
  type = 'button',
  children,
  customBg = false,
}) {
  return (
    <button
      className={`py-2 px-4 ${
        customBg ? '' : 'hover:bg-blue-300'
      } hover:bg-blue-300} cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
