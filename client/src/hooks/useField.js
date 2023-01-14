import { useState } from 'react';

const useField = (type, placeholder) => {
  const [value, setValue] = useState('');

  const onChange = event => {
    if (event === '') {
      setValue('');
      return;
    }
    setValue(event.target.value);
  };

  if (type === 'password') {
    return {
      value,
      onChange,
      placeholder,
    };
  } else {
    return {
      type,
      value,
      onChange,
      placeholder,
    };
  }
};

export default useField;
