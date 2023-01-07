import { isEmpty } from 'lodash';
import React from 'react';
import { FaExclamationCircle, FaEye, FaPen, FaTrashAlt } from 'react-icons/fa';

const TableItemHead = ({ children, borderNone = false }) => {
  return (
    <th
      className={`${
        borderNone ? '' : 'border border-gray-300 bg-gray-200 rounded-md'
      } p-2`}
    >
      {children}
    </th>
  );
};

const TableItemBody = ({ children }) => {
  return (
    <td className="border border-gray-300 bg-gray-100 py-2 px-4 rounded-md">
      {children}
    </td>
  );
};

export default function ListRegisters({
  registers,
  setPerson,
  setModal,
  deleteItem,
  setEditing,
  setData,
  setSection,
}) {
  const handleOpenModal = (people) => {
    setPerson(people);
    setModal((previousDefault) => !previousDefault);
  };

  const startEdit = (person) => {
    setEditing(true);
    setData(person);
    setSection('register');
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl text-blue-800 uppercase">Lista de Cadastros:</h2>
      {!isEmpty(registers) ? (
        <div className="overflow-hidden border-gray-300 mt-5 ">
          <table className="text-left border-separate">
            <thead>
              <tr>
                <TableItemHead>Nome</TableItemHead>
                <TableItemHead>Sobrenome</TableItemHead>
                <TableItemHead>Email</TableItemHead>
                <TableItemHead>CPF</TableItemHead>
                <TableItemHead borderNone />
                <TableItemHead borderNone />
                <TableItemHead borderNone />
              </tr>
            </thead>
            <tbody>
              {Object.keys(registers)?.map((person, index) => (
                <tr key={index}>
                  <TableItemBody>{registers[person].name}</TableItemBody>
                  <TableItemBody>{registers[person].lastName}</TableItemBody>
                  <TableItemBody>{registers[person].email}</TableItemBody>
                  <TableItemBody>{registers[person].document}</TableItemBody>

                  <TableItemBody>
                    <button
                      className="text-red-700"
                      onClick={() => deleteItem(registers[person])}
                    >
                      <FaTrashAlt />
                    </button>
                  </TableItemBody>
                  <TableItemBody>
                    <button
                      className="text-blue-700"
                      onClick={() => startEdit(registers[person])}
                    >
                      <FaPen />
                    </button>
                  </TableItemBody>
                  <TableItemBody>
                    <button
                      className="text-green-700"
                      onClick={() => handleOpenModal(registers[person])}
                    >
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
