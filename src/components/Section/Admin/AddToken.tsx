/* eslint-disable react-hooks/exhaustive-deps */
import useModal from '@/src/hooks/useModal';
import { Token } from '@/src/types';
import Button from '@/src/components/Button/Button';

type Props = {
  tokens: Token[];
};

const AddTokenSection = ({ tokens }: Props) => {
  const { openModal, ModalContentEnum } = useModal();

  const handleModal = () => openModal(ModalContentEnum.Form);

  return (
    <section className="add-token">
      <div className="add-token-section-content">
        <ul className="add-token-section-list">
          {tokens.length ? (
            tokens.map((token, idx) => (
              <li key={idx}>
                <span className="add-token-section-list-item-value">
                  {token.symbol}
                </span>
              </li>
            ))
          ) : (
            <span className="add-token-section-list-item-value">
              {'No tokens'}
            </span>
          )}
        </ul>

        <div className="add-token-section-button-block">
          <Button clickContent={handleModal}>{'Add Token'}</Button>
        </div>
      </div>
    </section>
  );
};

export default AddTokenSection;