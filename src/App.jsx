import React, { useState } from 'react';
import Button from './Components/Button';
import Header from './Components/Header';
import ListRegisters from './ListRegisters';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';
import ModalRegisteredPerson from './ModalRegisteredPerson';

function App() {
  const [section, setSection] = useState('register');
  const [person, setPerson] = useState({});
  const [modalRegisteredPerson, setModalRegisteredPerson] = useState(false);
  const [registers, setRegisters] = useState();
  const [registersInSequence, setRegistersInSequence] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const initialState = {
    name: '',
    lastName: '',
    document: '',
    email: '',
    birthDate: '',
    age: '',
    cep: '',
    city: '',
    district: '',
    street: '',
  };

  const [data, setData] = useState(initialState);

  const inSequency = localStorage.getItem('inSequency');
  if (inSequency) {
    setRegistersInSequence(true);
    localStorage.removeItem('inSequency');
  }

  React.useEffect(() => {
    const registeredPeople = JSON.parse(window.localStorage.getItem('Person'));

    const response = localStorage.getItem('res');
    if (response === 'success') {
      toast.success('Pessoa cadastrada com sucesso!');
      localStorage.removeItem('res');
      if (!registersInSequence) {
        setSection('registrationList');
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

  const startEdit = (person) => {
    setEditing(true);
    setData(person);
    setSection('register');
    if (modalRegisteredPerson) setModalRegisteredPerson(false);
  };

  return (
    <>
      <ModalRegisteredPerson
        person={person}
        modal={modalRegisteredPerson}
        deleteItem={deleteItem}
        setModal={setModalRegisteredPerson}
        setPerson={setPerson}
        startEdit={startEdit}
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
            isEditing={isEditing}
            data={data}
            setData={setData}
            initialState={initialState}
            setEditing={setEditing}
          />
        )}
        {section === 'registrationList' && (
          <ListRegisters
            registers={registers}
            setModal={setModalRegisteredPerson}
            deleteItem={deleteItem}
            setPerson={setPerson}
            startEdit={startEdit}
          />
        )}
      </div>
    </>
  );
}

export default App;
