import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Components/Button';
import InputMask from 'react-input-mask';
import { isEmpty, isUndefined } from 'lodash';
import { calcAge, validDate, validDocument } from '../utils';
import ToggleSwitchButton from '../Components/ToggleSwitchButton';
import { useFetch } from '../hooks';

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
      <div className="relative flex items-center">
        <InputComponent
          type={type}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          mask={mask}
          value={
            isUndefined(value)
              ? ''
              : id === 'age' && value >= 1
              ? value
              : value.age?.toString().replace('0.', '')
          }
          className={`border-blue-200 rounded-md focus:ring-0 focus:border-blue-500 bg-gray-50 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } w-60`}
          required
          disabled={disabled}
        />
        <p
          className={`opacity-30  right-3 ${
            id === 'age' ? 'absolute' : 'hidden'
          }`}
        >
          {value.lifeTime === 'Days'
            ? 'Dias'
            : value.lifeTime === 'Months'
            ? 'Meses'
            : 'Anos'}
        </p>
      </div>
    </div>
  );
};

const FormSection = ({ children }) => {
  return (
    <div className="flex md:space-x-10 md:space-y-0 flex-col md:flex-row space-y-10">
      {children}
    </div>
  );
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
  const [erro, setErro] = useState({});
  const { request, value, error } = useFetch();

  const onSubmit = (event) => {
    if (error || erro.document || erro.cep || erro.birthday) {
      event.preventDefault();
      toast.error('Não foi possível efetuar o cadastro!');
      return;
    } else {
      const person = {};
      person[data.document] = data;

      const registers = JSON.parse(window.localStorage.getItem('Person'));
      const newPerson = { ...registers, ...person };
      window.localStorage.setItem('Person', JSON.stringify(newPerson));
      if (isEditing) {
        localStorage.setItem('res', 'successEdited');
      } else {
        localStorage.setItem('res', 'success');
      }

      if (registersInSequence) {
        localStorage.setItem('inSequency', true);
      }
    }
  };

  React.useEffect(() => {
    setErro({});
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
    const { age, lifeTime } = calcAge(target.value);
    if (validDate(age)) {
      setData({ ...data, age: { age, lifeTime } });
      setErro({ ...erro, birthday: false });
    } else {
      toast.error('Data de aniversário inválida');
      setErro({ ...erro, birthday: true });
    }
  };

  const handleChangeCEP = (cep) => {
    const CEP = cep.replace(/[^\d]+/g, '');
    if (CEP.length < 1) {
      return;
    } else if (CEP.length < 8 && CEP.length > 0) {
      toast.error('CEP inválido');
      setErro({ ...erro, cep: true });
      return;
    } else {
      setErro({ ...erro, cep: false });
      request(`https://viacep.com.br/ws/${cep}/json/`);
    }
  };

  const handleValidation = ({ target }) => {
    if (!isEditing) {
      if (!validDocument(target.value)) {
        setErro({ ...erro, document: true });
      } else {
        setErro({ ...erro, document: false });
      }
    }
  };

  const clearForm = () => {
    setData(initialState);
    setEditing(false);
  };

  return (
    <>
      <div className="justify-end w-full mt-10 hidden md:flex">
        <div className="xl:mr-40 md:mr-10 xl:absolute space-y-2">
          <span className="text-gray-600 text-sm">Cadastros em Sequência:</span>
          <ToggleSwitchButton
            setActive={setRegistersInSequence}
            active={registersInSequence}
          />
        </div>
      </div>
      <div className="w-full flex justify-center flex-row mt-8 md:mt-5 xl:mt-0">
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
                type="number"
                value={data.age}
                disabled
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

          <div className="md:space-x-5 flex flex-col space-y-5 md:space-y-0 md:flex-row">
            <Button
              className="bg-blue-500 border-blue-400 rounded-md text-white hover:bg-blue-800"
              type="submit"
            >
              Finalizar Cadastro
            </Button>
            <Button
              className="bg-red-700 border-red-400 rounded-md text-white hover:bg-red-800"
              onClick={clearForm}
            >
              Limpar Campos
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
