type InputProps = {
  className?: string;
  type?: 'email' | 'password' | 'number' | 'text';
  placeholder?: string;
  maxLength?: number;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
};

const Input = (props: InputProps) => {
  const {
    className,
    type = 'text',
    placeholder,
    maxLength = 320,
    value,
    handleChange,
    disabled,
    required,
  } = props;

  return (
    <input
      className={`default-input ${className || ''}`}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      required={required}
    />
  );
};

export default Input;
