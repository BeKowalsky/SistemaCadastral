import { isEmpty } from 'lodash';
import React from 'react';
import { FaExclamationCircle, FaEye, FaPen, FaTrashAlt } from 'react-icons/fa';

const TableItemHead = ({ children, borderNone = false, className }) => {
  return (
    <th
      className={`${
        borderNone ? '' : 'border border-gray-300 bg-gray-200 rounded-md'
      } p-2 ${className} `}
    >
      {children}
    </th>
  );
};

const TableItemBody = ({ children, clickable = false, onClick, className }) => {
  return (
    <td
      className={`border border-gray-300 bg-gray-100 py-2 px-4 rounded-md truncate  ${
        clickable ? 'hover:bg-gray-200 cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
};

export default function ListRegisters({
  registers,
  setPerson,
  setModal,
  deleteItem,
  startEdit,
}) {
  const handleOpenModal = (people) => {
    setPerson(people);
    setModal((previousDefault) => !previousDefault);
  };

  return (
    <div className="flex flex-col items-center mt-8 md:mt-10">
      <h2 className="text-2xl text-blue-800 uppercase">Lista de Cadastros</h2>
      {!isEmpty(registers) ? (
        <div className="overflow-hidden border-gray-300 md:mt-5 mt-8">
          <table className="text-left border-separate">
            <thead>
              <tr>
                <TableItemHead className="hidden md:table-cell">
                  Nome
                </TableItemHead>
                <TableItemHead className="hidden lg:table-cell">
                  Sobrenome
                </TableItemHead>
                <TableItemHead className="hidden md:table-cell">
                  Email
                </TableItemHead>
                <TableItemHead>CPF</TableItemHead>
                <TableItemHead borderNone />
                <TableItemHead borderNone />
                <TableItemHead borderNone />
              </tr>
            </thead>
            <tbody>
              {Object.keys(registers)?.map((person, index) => (
                <tr key={index}>
                  <TableItemBody className="hidden md:table-cell">
                    {registers[person].name}
                  </TableItemBody>
                  <TableItemBody className="hidden lg:table-cell">
                    {registers[person].lastName}
                  </TableItemBody>
                  <TableItemBody className="hidden md:table-cell">
                    {registers[person].email}
                  </TableItemBody>
                  <TableItemBody>{registers[person].document}</TableItemBody>

                  <TableItemBody
                    clickable
                    onClick={() => deleteItem(registers[person])}
                  >
                    <button className="text-red-700 flex items-center">
                      <FaTrashAlt />
                    </button>
                  </TableItemBody>
                  <TableItemBody
                    clickable
                    onClick={() => startEdit(registers[person])}
                  >
                    <button className="text-blue-700 flex items-center">
                      <FaPen />
                    </button>
                  </TableItemBody>
                  <TableItemBody
                    clickable
                    onClick={() => handleOpenModal(registers[person])}
                  >
                    <button className="text-green-700 flex items-center">
                      <FaEye />
                    </button>
                  </TableItemBody>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 text-xl font-medium text-gray-500 p-4 rounded-md flex items-center">
          <FaExclamationCircle className="mr-2 text-yellow-500" />
          Sem cadastros!
        </div>
      )}
    </div>
  );
}
