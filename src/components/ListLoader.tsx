import DotsLoader from '@/src/components/DotsLoader';
import { vars } from '@/src/config';

const ListLoader = ({ text }: { text: string }) => {
  return (
    <span
      style={{
        display: 'flex',
        paddingTop: '12px',
        fontSize: '0.9rem',
        color: vars.greyDark,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
      <DotsLoader inlineStyle={{ color: vars.greyDark }} />
    </span>
  );
};

export default ListLoader;
