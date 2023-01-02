import React from 'react';
import PersonInformation from '../PersonInformation';

export default function Modal({ person, modal, deleteItem, setModal }) {
  return (
    <div
      className={`${
        modal ? 'fixed' : 'hidden'
      } backdrop-blur-[3px] w-full h-full flex justify-center`}
    >
      <div className="absolute border border-blue-500 rounded-md top-20 bg-blue-200 p-5 w-[40vw] 2xl:w-[30vw]">
        <PersonInformation
          person={person}
          setModal={setModal}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
}
