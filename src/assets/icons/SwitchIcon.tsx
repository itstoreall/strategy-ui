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
