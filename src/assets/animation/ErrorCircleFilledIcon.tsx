const ErrorCircleFilledIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 24 24"
    >
      <mask id="lineMdCloseCircleFilled0">
        <g
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path
            fill="#fff"
            fillOpacity="0"
            strokeDasharray="64"
            strokeDashoffset="64"
            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
          >
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.9s"
              dur="0.75s"
              values="0;1"
            />
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.9s"
              values="64;0"
            />
          </path>
          <path
            stroke="#000"
            strokeDasharray="8"
            strokeDashoffset="8"
            d="M12 12l4 4M12 12l-4 -4M12 12l-4 4M12 12l4 -4"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.65s"
              dur="0.3s"
              values="8;0"
            />
          </path>
        </g>
      </mask>
      <rect
        width="24"
        height="24"
        fill="#ea4335"
        mask="url(#lineMdCloseCircleFilled0)"
      />
    </svg>
  );
};

export default ErrorCircleFilledIcon;
