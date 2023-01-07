import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Components/Button';
import InputMask from 'react-input-mask';
import { isEmpty } from 'lodash';
import { calcAge, validDate, validDocument } from './utils';
import ToggleSwitchButton from './Components/ToggleSwitchButton';
import { useFetch } from './hooks';

const FormItem = ({
  title,
  type = 'text',
  id,
  onChange,
  onBlur,
  mask,
  value,
  disabled,
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
        className={`border-blue-200 rounded-md focus:ring-0 focus:border-blue-500 bg-gray-50 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        required
        disabled={disabled}
      />
    </div>
  );
};

const FormSection = ({ children }) => {
  return <div className="flex space-x-10">{children}</div>;
};

export default function RegisterForm({
  registersInSequence,
  setRegistersInSequence,
  isEditing,
  data,
  setData,
  initialState,
  setEditing,
}) {
  const [erro, setErro] = useState(false);
  const { request, value, error } = useFetch();

  const onSubmit = (event) => {
    if (error || erro) {
      event.preventDefault();
      toast.error('Não foi possível efetuar o cadastro!');
      return;
    } else {
      const person = {};
      person[data.document] = data;

      const registers = JSON.parse(window.localStorage.getItem('Person'));
      const newPerson = { ...registers, ...person };
      window.localStorage.setItem('Person', JSON.stringify(newPerson));
      localStorage.setItem('res', 'success');
      if (registersInSequence) {
        localStorage.setItem('inSequency', true);
      }
    }
  };

  React.useEffect(() => {
    setErro(false);
  }, []);

  React.useEffect(() => {
    if (value !== null) {
      setData((data) => {
        return {
          ...data,
          city: value.localidade,
          district: value.bairro,
          street: value.logradouro,
        };
      });
    }
    if (error) {
      if (error === 'CEP') {
        toast.error('CEP Inválido!');
      } else {
        toast.error('Ocorreu um erro ao puxar o CEP!');
      }
    }
  }, [value, error, setData]);

  const handleChangeBirthDate = ({ target }) => {
    const age = calcAge(target.value);
    if (validDate(age)) {
      setData({ ...data, age });
    }
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
      request(`https://viacep.com.br/ws/${cep}/json/`);
    }
  };

  const handleValidation = ({ target }) => {
    if (!isEditing) {
      if (!validDocument(target.value)) {
        setErro(true);
      } else {
        setErro(false);
      }
    }
  };

  const clearForm = () => {
    setData(initialState);
    setEditing(false);
  };

  return (
    <>
      <div className="flex justify-end w-full mt-10">
        <div className="mr-40 absolute space-y-2">
          <span className="text-gray-600 text-sm">Cadastros em Sequência:</span>
          <ToggleSwitchButton
            setActive={setRegistersInSequence}
            active={registersInSequence}
          />
        </div>
      </div>
      <div className=" w-full flex justify-center flex-row">
        <form className="flex flex-col space-y-10" onSubmit={onSubmit}>
          <div className="flex items-center flex-col space-y-10">
            <h2 className="text-2xl text-blue-800 uppercase">Cadastrar</h2>
            <FormSection>
              <FormItem
                title="Nome"
                id="name"
                value={data.name}
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
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
                onBlur={handleValidation}
                value={data.document}
                mask="999.999.999-99"
                disabled={isEditing}
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
                onChange={(event) =>
                  setData({ ...data, birthDate: event.target.value })
                }
                onBlur={handleChangeBirthDate}
              />
              <FormItem
                title="Idade"
                id="age"
                value={data.age}
                onChange={(event) =>
                  setData({ ...data, age: event.target.value })
                }
              />
            </FormSection>

            <FormSection>
              <FormItem
                title="CEP"
                id="cep"
                value={data.cep}
                onChange={(event) =>
                  setData({ ...data, cep: event.target.value })
                }
                onBlur={(event) => handleChangeCEP(event.target.value)}
                mask="99999-999"
              />
              <FormItem
                title="Cidade"
                id="city"
                value={data.city}
                onChange={(event) =>
                  setData({ ...data, city: event.target.value })
                }
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
          </div>

          <div className="space-x-5">
            <Button
              className="bg-blue-500 border-blue-400 rounded-md text-white hover:bg-blue-800"
              type="submit"
              customBg
            >
              Finalizar Cadastro
            </Button>
            <Button
              className="bg-red-700 border-red-400 rounded-md text-white hover:bg-red-800"
              onClick={clearForm}
              customBg
            >
              Limpar Campos
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
