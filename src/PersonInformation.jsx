import moment from 'moment/moment';
import React from 'react';
import { FaTimesCircle, FaTrashAlt } from 'react-icons/fa';

const InformationSection = ({ titleOne, titleTwo, valueOne, valueTwo }) => {
  return (
    <div className="flex mt-5 space-x-10">
      <div className="w-1/2">
        {titleOne}: {valueOne}
      </div>
      <div className="w-1/2">
        {titleTwo}: {valueTwo}
      </div>
    </div>
  );
};

export default function PersonInformation({ person, deleteItem, setModal }) {
  const handleClick = (person) => {
    deleteItem(person);
    setModal((previousDefault) => !previousDefault);
  };
  return (
    <div className="text-gray-700 w-full">
      <button
        className="text-blue-700 w-full flex justify-end"
        onClick={() => setModal((previousDefault) => !previousDefault)}
      >
        <FaTimesCircle className="text-xl" />
      </button>

      <div className="flex justify-between items-center w-full mt-3">
        <h2 className="font-bold text-xl">Sobre:</h2>
        <div className="text-xs">
          {person.name} {person.lastName}
        </div>
      </div>

      <InformationSection
        titleOne="CPF"
        titleTwo="Email"
        valueOne={person.document}
        valueTwo={person.email}
      />

      <InformationSection
        titleOne="Nascimento"
        titleTwo="Idade"
        valueOne={moment(person.birthDate).format('DD/MM/YYYY')}
        valueTwo={person.age}
      />

      <InformationSection
        titleOne="CEP"
        titleTwo="Cidade"
        valueOne={person.cep}
        valueTwo={person.city}
      />

      <InformationSection
        titleOne="Bairro"
        titleTwo="Rua"
        valueOne={person.district}
        valueTwo={person.street}
      />

      <div className="mt-10">
        <button
          className="text-red-700 border border-red-700 flex items-center py-2 px-6 rounded-md"
          onClick={() => handleClick(person)}
        >
          <FaTrashAlt className="mr-2" /> Deletar
        </button>
      </div>
    </div>
  );
}
