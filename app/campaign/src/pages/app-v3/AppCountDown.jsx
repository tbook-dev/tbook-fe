import { memo } from 'react';
import { Statistic } from 'antd';

const { Countdown } = Statistic;
const TimeIcon = ({ color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 5v5h3.75m3.75 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"
        stroke={ color }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const colorMap = {
  notStart: '#7b7086',
  ongoing: '#5812B1',
  end: '#000',
};

const textMap = {
  notStart: 'To Go',
  ongoing: 'Left',
  end: 'End',
};

const AppCountdown = ({ status, value }) => {
  const color = colorMap[ status ];
  const text = textMap[ status ];
  return (
    <div className="flex items-center font-bold text-black gap-x-1">
      {/* <TimeIcon color={color} /> */ }
      { status !== 'end' && (
        <Countdown
          value={ value }
          format="D[d] H[h] m[m] s[s]"
          valueStyle={ {
            color,
            fontSize: '14px',
            lineHeight: '16px',
            fontFamily: 'sf-bold',
          } }
        />
      ) }
      <span className="text-xs text-black" style={ { color } }>
        { text }
      </span>
    </div>
  );
};

export default memo(AppCountdown);
