import React from 'react';

export default function Header({ children }) {
  return (
    <div className="flex justify-center text-2xl font-medium bg-blue-900 text-white py-4">
      {children}
    </div>
  );
}
