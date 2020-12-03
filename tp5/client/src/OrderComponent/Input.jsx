import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

const Input = ({ name, label, type = 'text', placeholder = undefined }) => {
  const { errors, register } = useFormContext();

  const errorClass = useCallback(() => (errors[name] ? 'error' : ''), [
    errors,
  ])();

  return (
    <div className='col'>
      <div className='form-group'>
        <label className={errorClass}>
          {label}
        </label>
        <input
          className={`form-control ${errorClass}`}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || label}
          ref={register}
        />
      </div>
    </div>
  );
};

export default Input;
