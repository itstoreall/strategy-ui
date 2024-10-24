import React, { useState, forwardRef } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FieldError } from 'react-hook-form';
import Button from './Button';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const { className, placeholder } = props;
  const { error, disabled = false, ...register } = props;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        className={`default-input ${className} ${error ? 'error' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
        {...register}
      />

      <Button
        type="button"
        className="toggle-password-visibility"
        clickContent={togglePasswordVisibility}
        style={
          {
            // position: 'absolute',
            // padding: 0,
            // width: 20,
            // height: 20,
            // right: '1rem',
            // top: '50%',
            // transform: 'translateY(-50%)',
            // backgroundColor: 'transparent',
            // border: 'none',
            // color: 'hsl(0, 0%, 70%)',
          }
        }
      >
        {showPassword ? (
          <AiOutlineEyeInvisible size={'1.2rem'} />
        ) : (
          <AiOutlineEye size={'1.2rem'} />
        )}
      </Button>

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

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
