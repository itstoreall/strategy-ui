import { SessionContextValue } from 'next-auth/react';
import Container, { Label } from '@/src/components/Container/Page';
import Navigation from '@/src/components/Layout/Navigation';
import Logo from '@/src/components/Layout/Logo';

type Props = { session: SessionContextValue };

const Header = ({ session }: Props) => {
  return (
    <header className="header">
      <Container label={Label.Header}>
        <div className="header-content">
          <Logo />
          <Navigation session={session} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
