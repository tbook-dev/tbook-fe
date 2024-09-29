import React from 'react';
import { cn } from '@/utils/conf';

const animationStyle = `
  @keyframes strokeColorChange {
    0% {
      stroke: #0098ED;
    }
    50% {
      stroke: rgba(0, 152, 237, 0.3);
    }
    100% {
      stroke: #0098ED;
    }
  }
`;

const circleStyle = {
  animation: 'strokeColorChange 3s infinite'
};

export default function LoadingV2 ({ className, sbtClassName, text = '' }) {
  return (
    <div className={ cn('fixed inset-0 h-full overflow-hidden flex items-center justify-center', className) }>
      <style>{ animationStyle }</style>
      <svg width="375" height="464" viewBox="0 0 375 464" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle style={ circleStyle } cx="33.4687" cy="33.4687" r="33.4687" transform="matrix(-1 0 0 1 221.469 199.531)" stroke="#0098ED" strokeWidth="3" />
        <circle style={ circleStyle } cx="61.0312" cy="61.0312" r="61.0312" transform="matrix(-1 0 0 1 249.031 171.969)" stroke="#0098ED" strokeWidth="3" />
        <circle style={ circleStyle } cx="126" cy="126" r="126" transform="matrix(-1 0 0 1 314 107)" stroke="#0098ED" strokeOpacity="0.6" strokeWidth="3" />
        <circle style={ circleStyle } cx="160" cy="160" r="160" transform="matrix(-1 0 0 1 348 73)" stroke="#0098ED" strokeOpacity="0.4" strokeWidth="3" />
        <circle style={ circleStyle } cx="193" cy="193" r="193" transform="matrix(-1 0 0 1 381 40)" stroke="#0098ED" strokeOpacity="0.2" strokeWidth="3" />
        <circle style={ circleStyle } cx="230" cy="230" r="230" transform="matrix(-1 0 0 1 418 2)" stroke="#0098ED" strokeOpacity="0.2" strokeWidth="3" />
        <circle style={ circleStyle } cx="92.5312" cy="92.5312" r="92.5312" transform="matrix(-1 0 0 1 280.531 140.469)" stroke="#0098ED" strokeOpacity="0.75" strokeWidth="3" />
        <g clipPath="url(#clip0_11671_9605)">
          <path d="M188 265.516C170.042 265.516 155.484 250.503 155.484 231.984C155.484 213.465 170.042 198.452 188 198.452C205.958 198.452 220.516 213.465 220.516 231.984C220.516 250.503 205.958 265.516 188 265.516Z" fill="#0098EA" />
          <path d="M176.898 217.167H199.104C203.186 217.167 205.774 221.709 203.72 225.381L190.015 249.877C189.121 251.476 186.88 251.476 185.986 249.877L172.278 225.381C170.227 221.715 172.815 217.167 176.895 217.167H176.898ZM190.027 242.531L193.011 236.574L200.213 223.291C200.688 222.441 200.101 221.352 199.106 221.352H190.029V242.534L190.027 242.531ZM175.794 223.288L182.993 236.577L185.977 242.531V221.349H176.9C175.906 221.349 175.319 222.438 175.794 223.288Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_11671_9605">
            <rect width="65.0323" height="67.0645" fill="white" transform="matrix(-1 0 0 1 220.516 198.452)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}