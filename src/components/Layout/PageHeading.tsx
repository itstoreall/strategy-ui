import Title from '@/src/components/Layout/Title';

type Props = { title: string; role?: 'USER' | 'ADMIN' | '' };

const PageHeading = ({ title, role = '' }: Props) => {
  return (
    <div className="main-heading">
      <Title tag={'h2'} text={title} />
      {role && <span className="user-role">{role}</span>}
    </div>
  );
};

export default PageHeading;
