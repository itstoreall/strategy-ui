/* eslint-disable react-hooks/exhaustive-deps */
import useCreateToken from '@/src/hooks/token/useCreateToken';
import Button from '@/src/components/Button/Button';
import { Token } from '@/src/types';
import { useEffect } from 'react';

type Props = {
  tokens: Token[];
  fetchTokens: () => void;
};

const AddTokenSection = ({ tokens, fetchTokens }: Props) => {
  // const { openModal, ModalContentEnum } = useModal();

  const { mutate: createToken, isSuccess } = useCreateToken();

  useEffect(() => {
    if (isSuccess) fetchTokens();
  }, [isSuccess]);

  const handleSubmit = () => {
    createToken({ symbol: 'BTC', name: 'bitcoin' });
  };

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
          <Button clickContent={handleSubmit}>{'Add Token'}</Button>
        </div>
      </div>
    </section>
  );
};

export default AddTokenSection;
