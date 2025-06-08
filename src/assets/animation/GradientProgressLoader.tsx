type Props = {
  trigger: number;
};

const GradientProgressLoader: React.FC<Props> = ({ trigger }) => {
  /*
  return trigger ? (
    <div className={`gradient-progress-loader-block`} key={trigger}>
      <svg role="alert" aria-live="assertive">
        <rect className="border" />
        <rect className="filling" />
      </svg>
    </div>
  ) : null;
  */

  return (
    <div className="gradient-progress-loader-block" key={trigger}>
      <svg role="alert" aria-live="assertive">
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#34a853" />
            <stop offset="33%" stopColor="#fbbc05" />
            <stop offset="66%" stopColor="#ea4335" />
            <stop offset="100%" stopColor="#4285f4" />
          </linearGradient>
        </defs>
        <rect className="border" />
        <rect className="filling" fill="url(#progressGradient)" />
      </svg>
    </div>
  );
};

export default GradientProgressLoader;
