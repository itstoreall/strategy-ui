import Container, { Label } from '@/src/components/Container/Page';
import Copyright from '@/src/components/Layout/Copyright';

const Footer = () => {
  return (
    <footer className="footer">
      <Container label={Label.Footer}>
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
