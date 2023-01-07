import React, { useState } from 'react';

export const useFetch = () => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      response = await fetch(url, options);
      json = await response.json();
    } catch (erro) {
      json = null;
      setError('Não foi possível puxar os dados do CEP');
    } finally {
      if (json.erro) {
        setError('CEP');
      } else {
        setValue(json);
      }

      return { response, json };
    }
  }, []);

  return { value, error, request };
};
