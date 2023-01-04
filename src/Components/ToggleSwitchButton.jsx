import React from 'react';

export default function ToggleSwitchButton({ active, setActive, ...rest }) {
  return (
    <div
      className="w-10 h-4 flex items-center p-1 relative rounded-full"
      {...rest}
      onClick={() => setActive((preventDefault) => !preventDefault)}
    >
      <span
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all before:absolute before:content=[''] before:h-3 before:w-3 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all ${
          active ? 'before:translate-x-6 bg-sky-500' : 'bg-gray-400'
        }`}
      />
    </div>
  );
}
