import { SessionContextValue } from 'next-auth/react';
import Container, { Label } from '@/src/components/Container/Page';
import Navigation from '@/src/components/Navigation';

type Props = { session: SessionContextValue };

const Header = ({ session }: Props) => {
  return (
    <header className="header">
      <Container label={Label.Header}>
        <Navigation session={session} />
      </Container>
    </header>
  );
};

export default Header;