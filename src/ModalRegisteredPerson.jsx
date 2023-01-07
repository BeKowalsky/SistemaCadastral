import React from 'react';
import Modal from './Components/Modal';
import PersonInformation from './PersonInformation';

export default function ModalRegisteredPerson({
  person,
  modal,
  deleteItem,
  setModal,
  setPerson,
}) {
  return (
    <Modal modal={modal}>
      <div className="absolute border border-blue-500 rounded-md top-20 bg-blue-200 p-5 w-[40vw] 2xl:w-[30vw]">
        <PersonInformation
          person={person}
          setModal={setModal}
          deleteItem={deleteItem}
          setPerson={setPerson}
        />
      </div>
    </Modal>
  );
}
