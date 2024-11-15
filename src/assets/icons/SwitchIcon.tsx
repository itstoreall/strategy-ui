'use client';

import React from 'react';
import './SwitchIcon.scss';

const SwitchIcon = ({ isDisabled }: { isDisabled: boolean }) => {
  return (
    <svg
      className="context-switch-icon"
      width="42"
      height="22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={`switch-bg ${isDisabled ? 'off' : 'on'}`}
        x="0.5"
        y="0.5"
        width="41"
        height="21"
        rx="10.5"
      />
      <rect
        className="switch-border"
        x="0.5"
        y="0.5"
        width="41"
        height="21"
        rx="10.5"
      />
      <circle
        className={`switch-circle ${isDisabled ? 'off' : 'on'}`}
        cx={isDisabled ? '11' : '31'}
        cy="11"
        r="7.5"
      />
    </svg>
  );
};

export default SwitchIcon;

// const SwitchIcon = ({ status }: { status: 'on' | 'off' }) => {
//   // const statusCondition =
//   //   status === 'off' ? '#F2F2F2' : status === 'on' ? '#B499F9' : 'red';

//   const buttonBg = 'red';
//   const buttonBorder = 'blue';
//   const circleBg = 'green';
//   const circleBorder = 'yellow';

//   // const buttonBg = isLowBalance ? '#B9B9B9' : statusCondition;
//   // const buttonBorder = isLowBalance ? '#9A9A9A' : '#000';
//   // const circleBg = isLowBalance ? '#ffffff64' : '#fff';
//   // const circleBorder = isLowBalance ? '#9A9A9A' : '#000';

//   return (
//     <svg width="42" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect
//         x=".5"
//         y=".5"
//         width="41"
//         height="21"
//         rx="10.5"
//         fill={buttonBg}
//         style={{ transition: 'fill 0.3s' }}
//       />
//       <rect
//         x=".5"
//         y=".5"
//         width="41"
//         height="21"
//         rx="10.5"
//         stroke={buttonBorder}
//       />
//       <circle
//         cx={status === 'off' ? '13' : status === 'on' ? '29' : ''}
//         cy="11"
//         r="7.5"
//         fill={circleBg}
//         stroke={circleBorder}
//         style={{ transition: 'cx 0.3s' }}
//       />
//     </svg>
//   );
// };

// export default SwitchIcon;
