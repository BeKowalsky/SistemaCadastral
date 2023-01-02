import React, { useState } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const TableItemHead = ({ children }) => {
  return <th className="border border-gray-300 bg-gray-200 p-2">{children}</th>;
};

const TableItemBody = ({ children }) => {
  return (
    <td className="border border-gray-300 bg-gray-100 py-2 px-4">{children}</td>
  );
};

export default function ListRegisters() {
  const [registers, setRegisters] = useState();

  React.useEffect(() => {
    const registeredPeople = JSON.parse(window.localStorage.getItem('Person'));
    if (registeredPeople !== null) setRegisters(registeredPeople);
  }, []);

  const handleClick = () => {};

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl text-blue-800 uppercase">Lista de Cadastros:</h2>
      {registers && (
        <div className="rounded-md overflow-hidden border border-gray-300 mt-5 ">
          <table className="text-left">
            <thead>
              <tr>
                <TableItemHead>Nome</TableItemHead>
                <TableItemHead>Sobrenome</TableItemHead>
                <TableItemHead>Email</TableItemHead>
                <TableItemHead>CPF</TableItemHead>
                <TableItemHead></TableItemHead>
                <TableItemHead></TableItemHead>
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
                    <button className="text-green-700" onClick={handleClick}>
                      <FaEye />
                    </button>
                  </TableItemBody>
                  <TableItemBody>
                    <button className="text-red-700" onClick={handleClick}>
                      <FaTrashAlt />
                    </button>
                  </TableItemBody>{' '}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
