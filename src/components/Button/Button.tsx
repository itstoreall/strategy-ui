'use client';

import { useRouter } from 'next/navigation';

type ButtonProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  type?: 'submit' | 'button';
  clickContent?: (() => void) | string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    children = 'Submit',
    style,
    className,
    type = 'submit',
    clickContent,
    disabled,
  } = props;

  const router = useRouter();

  const onClickHandler = () => {
    if (typeof clickContent === 'function') {
      clickContent();
    } else if (typeof clickContent === 'string') {
      router.push(clickContent);
    } else return;
  };

  const disableStyle = disabled ? 'disabled' : '';
  const btnStyle = `uni-button ${className || ''} ${disableStyle}`;

  return (
    <button
      style={{ cursor: 'pointer', ...style }}
      className={btnStyle}
      type={type}
      onClick={() => onClickHandler()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
