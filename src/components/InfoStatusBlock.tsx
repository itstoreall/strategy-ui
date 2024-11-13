import { RxExclamationTriangle } from 'react-icons/rx';
import ConfirmCircleFilledIcon from '@/src/assets/animation/ConfirmCircleFilledIcon';

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
      <RxExclamationTriangle className="info-status-block-icon" />
    );

  return (
    <div className={`info-status-block ${status} ${className}`}>
      {icon}
      {status && (
        <span className="info-status-block-title">{`${status}!`}</span>
      )}
      {text && <p className="info-status-block-text">{text}</p>}
    </div>
  );
};

export default InfoStatusBlock;

/*
<RxCheckCircled className="info-status-block-icon" size={'4rem'} />
*/
