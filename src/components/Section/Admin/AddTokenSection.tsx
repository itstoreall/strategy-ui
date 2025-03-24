/* eslint-disable react-hooks/exhaustive-deps */
import { deleteToken } from '@/src/lib/auth/deleteTokenServerAction';
// import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useModal from '@/src/hooks/useModal';
// import { QueryKeyEnum } from '@/src/enums';
import { Token } from '@/src/types';
import Button from '@/src/components/Button/Button';
// import { useQueryClient } from '@tanstack/react-query';

type Props = {
  tokens: Token[];
  refetchTokens: () => void;
};

const AddTokenSection = ({ tokens, refetchTokens }: Props) => {
  const { openModal, ModalContentEnum } = useModal();
  // const { updateData } = useInvalidateQueries();
  // const queryClient = useQueryClient();

  const handleModal = () => openModal(ModalContentEnum.Form);

  const removeToken = async (symbol: string) => {
    if (confirm(`The Token (${symbol}) will be deleted!`)) {
      const res = await deleteToken(symbol);
      if (res.symbol === symbol) {
        console.log('res', res);
        refetchTokens();
        // updateData([QueryKeyEnum.Tokens]);
        // queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.Tokens] });
      }
    }
  };

  return (
    <section className="section add-token">
      <div className="section-content add-token-section-content">
        <ul className="add-token-section-list">
          {tokens.length ? (
            tokens
              .slice()
              .sort((a, b) => a.symbol.localeCompare(b.symbol))
              .map((token, idx) => (
                <li
                  className="add-token-section-list-item"
                  key={idx}
                  onClick={() => removeToken(token.symbol)}
                >
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
