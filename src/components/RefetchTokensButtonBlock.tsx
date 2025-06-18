import Button from './Button/Button';

type Props = {
  refetchTokens: () => void;
};

const RefetchTokensButtonBlock = ({ refetchTokens }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100svh - 226px)',
      }}
    >
      <Button className="refetch-tokens-button" clickContent={refetchTokens}>
        Refetch
      </Button>
    </div>
  );
};

export default RefetchTokensButtonBlock;
