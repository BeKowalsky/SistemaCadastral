import React, { useState } from 'react';
import Button from './Components/Button';

const FormItem = ({ title, type = 'text', id, onChange }) => {
  return (
    <div className="flex flex-col space-y-2 w-60">
      <label htmlFor={title} className="font-medium uppercase">
        {title}:
      </label>
      <input
        type={type}
        id={id}
        onChange={onChange}
        className="border-blue-200 rounded-md focus:ring-0 focus:border-blue-500 bg-gray-50"
      />
    </div>
  );
};

const FormSection = ({ children }) => {
  return <div className="flex space-x-10">{children}</div>;
};

export default function RegisterForm() {
  const [data, setData] = useState({
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
  });

  // Mudar tudo isso, forma errada de fazer essas atribuições de valores.
  const handleChangeName = (event) => {
    setData({ ...data, name: event.target.value });
  };
  const handleChangeLastName = (event) => {
    setData({ ...data, lastName: event.target.value });
  };
  const handleChangeDocument = (event) => {
    setData({ ...data, document: event.target.value });
  };
  const handleChangeEmail = (event) => {
    setData({ ...data, email: event.target.value });
  };
  const handleChangeBirthDate = (event) => {
    setData({ ...data, birthDate: event.target.value });
  };
  const handleChangeAge = (event) => {
    setData({ ...data, age: event.target.value });
  };
  const handleChangeCEP = (event) => {
    setData({ ...data, cep: event.target.value });
  };
  const handleChangeCity = (event) => {
    setData({ ...data, city: event.target.value });
  };
  const handleChangeDistrict = (event) => {
    setData({ ...data, district: event.target.value });
  };
  const handleChangeStreet = (event) => {
    setData({ ...data, street: event.target.value });
  };

  const onSubmit = () => {
    const person = {};
    person[data.name] = data;

    const registers = JSON.parse(window.localStorage.getItem('Person'));
    const newPerson = { ...registers, ...person };

    window.localStorage.setItem('Person', JSON.stringify(newPerson));
  };

  return (
    <div className="mt-10">
      <form
        className="flex items-center flex-col space-y-10"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl text-blue-800 uppercase">Cadastrar:</h2>
        <FormSection>
          <FormItem title="Nome" id="name" onChange={handleChangeName} />
          <FormItem
            title="Sobrenome"
            id="lastName"
            onChange={handleChangeLastName}
          />
        </FormSection>

        <FormSection>
          <FormItem title="CPF" id="document" onChange={handleChangeDocument} />
          <FormItem title="Email" id="email" onChange={handleChangeEmail} />
        </FormSection>

        <FormSection>
          <FormItem
            title="Data de Nascimento"
            type="date"
            id="birthDate"
            onChange={handleChangeBirthDate}
          />
          <FormItem title="Idade" id="age" onChange={handleChangeAge} />
        </FormSection>

        <FormSection>
          <FormItem title="CEP" id="cep" onChange={handleChangeCEP} />
          <FormItem title="Cidade" id="city" onChange={handleChangeCity} />
        </FormSection>

        <FormSection>
          <FormItem
            title="Bairro"
            id="district"
            onChange={handleChangeDistrict}
          />
          <FormItem title="Rua" id="street" onChange={handleChangeStreet} />
        </FormSection>

        <Button
          className="bg-blue-500 border-blue-400 rounded-md text-white hover:bg-blue-700"
          type="submit"
        >
          Finalizar Cadastro
        </Button>
      </form>
    </div>
  );
}
