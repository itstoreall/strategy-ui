import ConfirmCircleFilledIcon from '@/src/assets/animation/ConfirmCircleFilledIcon';
import ErrorCircleFilledIcon from '@/src/assets/animation/ErrorCircleFilledIcon';

type Props = {
  text?: string;
  status?: 'success' | 'error';
  className?: string;
};

const InfoStatusBlock = (props: Props) => {
  const { text, status, className } = props;

  const icon =
    status === 'success' ? (
      <ConfirmCircleFilledIcon />
    ) : (
      <ErrorCircleFilledIcon />
    );

  const statusText = status === 'error' ? 'Oops' : status;

  return (
    <div className={`info-status-block ${status} ${className}`}>
      {icon}
      {status && (
        <span className="info-status-block-title">{`${statusText}!`}</span>
      )}
      {text && <p className="info-status-block-text">{text}</p>}
    </div>
  );
};

export default InfoStatusBlock;

/*
import { RxExclamationTriangle,RxExclamationTriangle } from 'react-icons/rx';
<RxCheckCircled className="info-status-block-icon" size={'4rem'} />
<RxExclamationTriangle className="info-status-block-icon" size={'4rem'} />
*/
