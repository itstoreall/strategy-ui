import DotsLoader from '@/src/components/DotsLoader';

const c = {
  listLoaderColor: '#3a3f46',
};

const ListLoader = ({ text }: { text: string }) => {
  return (
    <span
      style={{
        display: 'flex',
        paddingTop: '12px',
        fontSize: '0.9rem',
        color: c.listLoaderColor,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
      <DotsLoader inlineStyle={{ color: c.listLoaderColor }} />
    </span>
  );
};

export default ListLoader;
