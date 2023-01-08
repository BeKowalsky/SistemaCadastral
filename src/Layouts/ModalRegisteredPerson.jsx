import React from 'react';
import Modal from '../Components/Modal';

import PersonInformation from './PersonInformation';

export default function ModalRegisteredPerson({
  person,
  modal,
  deleteItem,
  setModal,
  setPerson,
  startEdit,
}) {
  return (
    <Modal modal={modal}>
      <div className="absolute border border-blue-500 rounded-md lg:top-20 md:top-10 top-5 bg-blue-200 p-5 xl:w-[40vw] 2xl:w-[30vw] lg:w-[60vw] w-11/12">
        <PersonInformation
          person={person}
          setModal={setModal}
          deleteItem={deleteItem}
          setPerson={setPerson}
          startEdit={startEdit}
        />
      </div>
    </Modal>
  );
}
