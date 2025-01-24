import useModal from '@/src/hooks/useModal';
import { GoKebabHorizontal } from 'react-icons/go';
import Button from '../Button/Button';

type Props = {
  name: string;
  value: string;
  mutable?: boolean;
};

const OptionSection = ({ name, value, mutable = false }: Props) => {
  const { openModal, ModalContentEnum } = useModal();

  const handleModal = () => openModal(ModalContentEnum.Form);

  return (
    <section className="section single-option">
      <div className="section-content option-content">
        <span className="content-name">{name}</span>
        <span className="content-value">{value}</span>
      </div>

      {mutable && (
        <div className="option-editor">
          <Button className="option-editor-button" clickContent={handleModal}>
            <GoKebabHorizontal />
          </Button>
        </div>
      )}
    </section>
  );
};

export default OptionSection;
