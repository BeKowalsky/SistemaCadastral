import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Components/Button';
import InputMask from 'react-input-mask';
import { isEmpty } from 'lodash';

const FormItem = ({ title, type = 'text', id, onChange, mask }) => {
  const InputComponent = isEmpty(mask) ? 'input' : InputMask;

  return (
    <div className="flex flex-col space-y-2 w-60">
      <label htmlFor={title} className="font-medium uppercase">
        {title}:
      </label>
      <InputComponent
        type={type}
        id={id}
        onChange={onChange}
        mask={mask}
        className="border-blue-200 rounded-md focus:ring-0 focus:border-blue-500 bg-gray-50"
        required
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

  const onSubmit = () => {
    const person = {};
    person[data.name] = data;

    const registers = JSON.parse(window.localStorage.getItem('Person'));
    const newPerson = { ...registers, ...person };
    window.localStorage.setItem('Person', JSON.stringify(newPerson));
    localStorage.setItem('res', 'success');
  };

  React.useEffect(() => {
    const response = localStorage.getItem('res');
    if (response === 'success') {
      toast.success('Pessoa cadastrada com sucesso!');
      localStorage.removeItem('res');
    }
  }, []);

  return (
    <div className="mt-10">
      <form
        className="flex items-center flex-col space-y-10"
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl text-blue-800 uppercase">Cadastrar:</h2>
        <FormSection>
          <FormItem
            title="Nome"
            id="name"
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
          <FormItem
            title="Sobrenome"
            id="lastName"
            onChange={(event) =>
              setData({ ...data, lastName: event.target.value })
            }
          />
        </FormSection>

        <FormSection>
          <FormItem
            title="CPF"
            id="document"
            onChange={(event) =>
              setData({ ...data, document: event.target.value })
            }
            mask="999.999.999-99"
          />
          <FormItem
            title="Email"
            id="email"
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          />
        </FormSection>

        <FormSection>
          <FormItem
            title="Data de Nascimento"
            type="date"
            id="birthDate"
            onChange={(event) =>
              setData({ ...data, birthDate: event.target.value })
            }
          />
          <FormItem
            title="Idade"
            id="age"
            onChange={(event) => setData({ ...data, age: event.target.value })}
          />
        </FormSection>

        <FormSection>
          <FormItem
            title="CEP"
            id="cep"
            onChange={(event) => setData({ ...data, cep: event.target.value })}
            mask="99999-999"
          />
          <FormItem
            title="Cidade"
            id="city"
            onChange={(event) => setData({ ...data, city: event.target.value })}
          />
        </FormSection>

        <FormSection>
          <FormItem
            title="Bairro"
            id="district"
            onChange={(event) =>
              setData({ ...data, district: event.target.value })
            }
          />
          <FormItem
            title="Rua"
            id="street"
            onChange={(event) =>
              setData({ ...data, street: event.target.value })
            }
          />
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
