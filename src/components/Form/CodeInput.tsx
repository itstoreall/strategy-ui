import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

const CodeInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, placeholder, maxLength } = props;
  const { error, disabled = false, ...register } = props;

  return (
    <div style={{ position: 'relative' }}>
      <input
        type={'tel'}
        placeholder={placeholder}
        className={`default-input ${className} ${error ? 'error' : ''}`}
        disabled={disabled}
        maxLength={maxLength}
        ref={ref}
        {...register}
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
        }}
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

CodeInput.displayName = 'CodeInput';

export default CodeInput;
