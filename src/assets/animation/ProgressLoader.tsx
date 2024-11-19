import { useState, useEffect } from 'react';

const ProgressLoader = ({ duration }: { duration: number }) => {
  const [loading, hasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasLoaded(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`progress-loader-block ${
        loading ? 'progress-loader-success' : 'progress-loader-failure'
      }`}
    >
      <svg role="alert" aria-live="assertive">
        <rect className="border" />
        <rect className="filling" />
      </svg>
    </div>
  );
};

export default ProgressLoader;
