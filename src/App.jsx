import React, { useState } from 'react';
import Button from './Components/Button';
import Header from './Components/Header';
import Modal from './Components/Modal';
import ListRegisters from './ListRegisters';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';

function App() {
  const [section, setSection] = useState('register');
  const [person, setPerson] = useState({});
  const [modal, setModal] = useState(false);
  const [registers, setRegisters] = useState();
  const [registersInSequence, setRegistersInSequence] = useState(false);

  console.log(registersInSequence);

  const inSequency = localStorage.getItem('inSequency');
  if (inSequency) {
    setRegistersInSequence(true);
    localStorage.removeItem('inSequency');
  }

  React.useEffect(() => {
    const registeredPeople = JSON.parse(window.localStorage.getItem('Person'));

    const response = localStorage.getItem('res');
    const registeredPerson = localStorage.getItem('register');
    if (response === 'success') {
      toast.success('Pessoa cadastrada com sucesso!');
      localStorage.removeItem('res');
      if (!registersInSequence) {
        setSection('registrationList');
        setPerson(JSON.parse(registeredPerson));
        localStorage.removeItem('register');
        setModal((previousDefault) => !previousDefault);
      }
    }

    if (registeredPeople !== null) setRegisters(registeredPeople);
  }, [registersInSequence]);

  const deleteItem = (people) => {
    const registeredPeople = JSON.parse(window.localStorage.getItem('Person'));

    Object.keys(registeredPeople)?.map(
      (person) =>
        JSON.stringify(people) === JSON.stringify(registeredPeople[person]) &&
        delete registeredPeople[person],
    );

    window.localStorage.setItem('Person', JSON.stringify(registeredPeople));
    setRegisters(registeredPeople);
    toast.success('Pessoa removida do cadastro com sucesso!');
  };

  return (
    <>
      <Modal
        person={person}
        modal={modal}
        deleteItem={deleteItem}
        setModal={setModal}
        setPerson={setPerson}
      />
      <div className="App bg-blue-50 min-h-screen pb-10">
        <Header>Sistema Cadastral</Header>
        <div className="flex justify-start text-lg bg-blue-200  divide-x divide-blue-700 border border-y border-blue-700 text-blue-800">
          <Button
            onClick={() => setSection('register')}
            className={section === 'register' ? 'bg-blue-300' : ''}
          >
            Cadastrar
          </Button>
          <Button
            onClick={() => setSection('registrationList')}
            className={section === 'registrationList' ? 'bg-blue-300' : ''}
          >
            Lista de Cadastros
          </Button>
        </div>
        {section === 'register' && (
          <RegisterForm
            registersInSequence={registersInSequence}
            setRegistersInSequence={setRegistersInSequence}
          />
        )}
        {section === 'registrationList' && (
          <ListRegisters
            registers={registers}
            setModal={setModal}
            deleteItem={deleteItem}
            setPerson={setPerson}
          />
        )}
      </div>
    </>
  );
}

export default App;
