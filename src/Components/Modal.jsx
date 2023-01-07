import React from 'react';

export default function Modal({ modal, children }) {
  return (
    <div
      className={`${
        modal ? 'fixed' : 'hidden'
      } backdrop-blur-[3px] w-full h-full flex justify-center`}
    >
      {children}
    </div>
  );
}
