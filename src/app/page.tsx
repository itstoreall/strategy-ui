'use client';

import Button from '@/src/components/Button/Button';

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-page">
        <h2>Strategy</h2>
        <div className="button-block">
          <Button clickContent="/auth/sign-in">Sign In</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
