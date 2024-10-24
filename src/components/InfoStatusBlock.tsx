import { RxCheckCircled, RxExclamationTriangle } from 'react-icons/rx';

type Props = {
  text?: string;
  status?: 'success' | 'error';
  className?: string;
};

const InfoStatusBlock = (props: Props) => {
  const { text, status, className } = props;

  const icon =
    status === 'success' ? (
      <RxCheckCircled className="icon" />
    ) : (
      <RxExclamationTriangle className="icon" />
    );

  return (
    <div className={`info-status-block ${status} ${className}`}>
      {icon}
      {text && <p>{text}</p>}
    </div>
  );
};

export default InfoStatusBlock;
