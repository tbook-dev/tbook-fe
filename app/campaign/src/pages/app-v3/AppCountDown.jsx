import { memo } from 'react';
import { Statistic } from 'antd';

const { Countdown } = Statistic;

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
      <span className="text-[14px] text-black" style={ { color } }>
        { text }
      </span>
    </div>
  );
};

export default memo(AppCountdown);
