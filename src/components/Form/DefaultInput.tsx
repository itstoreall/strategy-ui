type Props = {
  type?: string;
  className?: string;
  placeholder?: string;
  value: string;
  handleChange: (str: string) => void;
  disabled?: boolean;
  error?: string;
};

const DefaultInput = (props: Props) => {
  const {
    type = 'text',
    className,
    placeholder,
    value,
    handleChange,
    disabled = false,
    error,
  } = props;

  return (
    <div style={{ position: 'relative' }}>
      <input
        className={`default-input ${className} ${error ? 'error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default DefaultInput;
