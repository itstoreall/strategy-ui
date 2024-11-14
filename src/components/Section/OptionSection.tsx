import useModal from '@/src/hooks/useModal';
import { GoKebabHorizontal } from 'react-icons/go';

type Props = {
  name: string;
  value: string;
  mutable?: boolean;
};

const OptionSection = ({ name, value, mutable = false }: Props) => {
  const { openModal, ModalContentEnum } = useModal();

  const seeCertificates = () => openModal(ModalContentEnum.Form);

  return (
    <section className="settings option">
      <div className="option-content">
        <span className="content-name">{name}</span>
        <span className="content-value">{value}</span>
      </div>

      {mutable && (
        <div className="option-editor">
          <button className="option-editor-button" onClick={seeCertificates}>
            <GoKebabHorizontal />
          </button>
        </div>
      )}
    </section>
  );
};

export default OptionSection;
