import React, { useState } from 'react';
import Button from './Components/Button';
import Header from './Components/Header';
import ListRegisters from './ListRegisters';
import RegisterForm from './RegisterForm';

function App() {
  const [section, setSection] = useState('register');

  return (
    <div className="App bg-blue-50 h-screen">
      <Header>Sistema Cadastral</Header>
      <div className="flex justify-start text-lg bg-blue-200  divide-x divide-blue-700 border border-y border-blue-700 text-blue-800">
        <Button onClick={() => setSection('register')}>Cadastrar</Button>
        <Button onClick={() => setSection('registrationList')}>
          Lista de Cadastros
        </Button>
      </div>
      {section === 'register' && <RegisterForm />}
      {section === 'registrationList' && <ListRegisters />}
    </div>
  );
}

export default App;
