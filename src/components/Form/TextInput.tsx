import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

const TextInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = 'text', className, placeholder } = props;
  const { error, disabled = false, ...register } = props;

  // ---

  const errorStyle = error ? 'error' : '';
  const disableStyle = disabled ? 'disable' : '';
  const customStyle = className ? className : '';
  const inputStyle = `default-input ${customStyle} ${disableStyle} ${errorStyle}`;

  return (
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        placeholder={placeholder}
        className={inputStyle}
        disabled={disabled}
        // size={10}
        ref={ref}
        {...register}
      />

      {error && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-1rem',
            fontSize: 10,
            color: 'red',
          }}
          className="error-message"
        >
          {error.message}
        </span>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
