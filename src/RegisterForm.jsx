import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Components/Button';
import InputMask from 'react-input-mask';
import { isEmpty } from 'lodash';
import { calcAge, isCpf } from './utils';

const FormItem = ({
  title,
  type = 'text',
  id,
  onChange,
  onBlur,
  mask,
  value,
}) => {
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
        onBlur={onBlur}
        mask={mask}
        value={value}
        className="border-blue-200 rounded-md focus:ring-0 focus:border-blue-500 bg-gray-50"
        required
      />
    </div>
  );
};

const FormSection = ({ children }) => {
  return <div className="flex space-x-10">{children}</div>;
};

export default function RegisterForm({
  setSection,
  setPerson,
  setModal,
  person,
  section,
  modal,
}) {
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

  const [erro, setErro] = useState(false);

  const onSubmit = (event) => {
    if (!isCpf(data.document) || erro) {
      event.preventDefault();
      toast.error('Não foi possível concluir o cadastro!');
      return;
    } else {
      const person = {};
      person[data.name] = data;

      const registers = JSON.parse(window.localStorage.getItem('Person'));
      const newPerson = { ...registers, ...person };
      window.localStorage.setItem('Person', JSON.stringify(newPerson));
      localStorage.setItem('res', 'success');
      localStorage.setItem('register', JSON.stringify(person[data.name]));
    }
  };

  React.useEffect(() => {
    setErro(false);
  }, []);

  const handleChangeBirthDate = (birthDate) => {
    const age = calcAge(birthDate);
    setData({ ...data, birthDate, age });
  };

  const handleChangeCEP = (cep) => {
    const CEP = cep.replace(/[^\d]+/g, '');
    if (CEP.length < 1) {
      return;
    } else if (CEP.length < 8 && CEP.length > 0) {
      toast.error('CEP inválido');
      setErro(true);
      return;
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((json) => {
          if (json.erro) {
            toast.error('CEP inválido');
            setErro(true);
            return;
          } else {
            setData({
              ...data,
              city: json.localidade,
              district: json.bairro,
              street: json.logradouro,
            });
            setErro(false);
          }
        });
    }
  };

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
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
          <FormItem
            title="Sobrenome"
            id="lastName"
            value={data.lastName}
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
            onBlur={(event) =>
              !isCpf(event.target.value) &&
              event.target.value.length > 0 &&
              toast.error('CPF inválido!')
            }
            value={data.document}
            mask="999.999.999-99"
          />
          <FormItem
            title="Email"
            id="email"
            value={data.email}
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
            value={data.birthDate}
            onChange={(event) => handleChangeBirthDate(event.target.value)}
          />
          <FormItem
            title="Idade"
            id="age"
            value={data.age}
            onChange={(event) => setData({ ...data, age: event.target.value })}
          />
        </FormSection>

        <FormSection>
          <FormItem
            title="CEP"
            id="cep"
            value={data.cep}
            onChange={(event) => setData({ ...data, cep: event.target.value })}
            onBlur={(event) => handleChangeCEP(event.target.value)}
            mask="99999-999"
          />
          <FormItem
            title="Cidade"
            id="city"
            value={data.city}
            onChange={(event) => setData({ ...data, city: event.target.value })}
          />
        </FormSection>

        <FormSection>
          <FormItem
            title="Bairro"
            id="district"
            value={data.district}
            onChange={(event) =>
              setData({ ...data, district: event.target.value })
            }
          />
          <FormItem
            title="Rua"
            id="street"
            value={data.street}
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
