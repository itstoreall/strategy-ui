"use client";

import SignInButton from "@/src/components/SignInButton";

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-page">
        <h2>Home</h2>
        <div>
          <SignInButton className="sign-in-button" />
        </div>
      </div>
    </div>
  );
};

export default Home;
