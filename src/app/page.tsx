'use client';

import Button from '@/src/components/Button';

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-page">
        <h2>Home</h2>
        <div className="button-block">
          <Button clickContent="/auth/sign-in">Sign In</Button>

          <Button clickContent="/auth/sign-up">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
