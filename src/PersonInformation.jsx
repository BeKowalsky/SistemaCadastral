import moment from 'moment/moment';
import React from 'react';
import { FaTimesCircle, FaTrashAlt } from 'react-icons/fa';

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
      {/* Generalizar divs repetidas */}
      <div className="flex justify-between items-center w-full mt-3">
        <h2 className="font-bold text-xl">Sobre:</h2>
        <div className="text-xs">
          {person.name} {person.lastName}
        </div>
      </div>
      <div className="flex mt-5 space-x-10">
        <div className="w-1/2">CPF: {person.document}</div>
        <div className="w-1/2">Email: {person.email}</div>
      </div>

      <div className="flex mt-5 space-x-10">
        <div className="w-1/2">
          Nascimento: {moment(person.birthDate).format('L')}
        </div>
        <div className="w-1/2">Idade: {person.age}</div>
      </div>

      <div className="flex mt-5 space-x-10">
        <div className="w-1/2">CEP: {person.cep}</div>
        <div className="w-1/2">Cidade: {person.city}</div>
      </div>

      <div className="flex mt-5 space-x-10">
        <div className="w-1/2">Bairro: {person.district}</div>
        <div className="w-1/2">Rua: {person.street}</div>
      </div>

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
