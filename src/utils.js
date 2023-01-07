import { forEach } from 'lodash';
import { toast } from 'react-toastify';

export const asInt = (value) => parseInt(value, 10);

export function onlyDigits(str) {
  if (!str) {
    return '';
  }

  return str.replace(/\D/g, '');
}

export function calcAge(birthDate) {
  const today = new Date();
  const birthday = new Date(birthDate);
  let age = today.getFullYear() - birthday.getFullYear();

  if (
    today.getMonth() + 1 < birthday.getMonth() + 1 ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() < birthday.getDate())
  ) {
    age = age - 1;
  }

  return age;
}

export function isCpf(str) {
  const cpf = onlyDigits(str);

  if (cpf.length !== 11) {
    return false;
  }

  let isRepeated = true;
  for (let index = 1; index < cpf.length; index++) {
    if (cpf.charAt(0) !== cpf.charAt(index)) {
      isRepeated = false;
    }
  }

  if (isRepeated) {
    return false;
  }

  const getVerifier = (length) => {
    let sum = 0;
    forEach(cpf.slice(0, length), (digit, index) => {
      sum += asInt(digit) * (1 + length - index);
    });

    const verifier = (sum * 10) % 11;

    return verifier < 10 ? verifier : 0;
  };

  const first = getVerifier(9);

  if (first !== asInt(cpf[9])) {
    return false;
  }

  const second = getVerifier(10);

  if (second !== asInt(cpf[10])) {
    return false;
  }

  return true;
}

export const validDocument = (value) => {
  const registers = Object.keys(
    JSON.parse(window.localStorage.getItem('Person')),
  );

  const alreadyExists = !!registers.find((element) => element === value);

  if (!isCpf(value) && value.length > 0) {
    toast.error('CPF inválido!');
    return false;
  } else if (alreadyExists) {
    toast.error('CPF já cadastrado!');
    return false;
  }
  return true;
};

export const validDate = (value) => {
  if (Number.isNaN(value)) {
    return false;
  }

  return true;
};
