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

  return trigger ? (
    <div className="gradient-progress-loader-block" key={trigger}>
      <span
        className="gradient-progress-bar"
        role="alert"
        aria-live="assertive"
      />
    </div>
  ) : null;
};

export default GradientProgressLoader;
