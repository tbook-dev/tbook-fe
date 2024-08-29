import { memo } from 'react';
import { Statistic } from 'antd';
import TimeIcon from '@/images/icon/svgr/time.svg?react';

const { Countdown } = Statistic;

const AppCountdown = ({ status, value }) => {
  return (
    <div className="flex items-center gap-x-1 font-sf-bold">
      {status === 'notStart' && (
        <>
          <TimeIcon />
          <Countdown
            value={value}
            format="D[d] H[h] m[m] s[s]"
            valueStyle={{
              color: '#CFF469',
              fontSize: '12px',
              lineHeight: '16px',
              fontFamily: 'sf-bold',
            }}
          />
        </>
      )}
      {status === 'ongoing' && (
        <>
          <TimeIcon />
          <Countdown
            value={value}
            format="D[d] H[h] m[m] s[s]"
            valueStyle={{
              color: '#CFF469',
              fontSize: '12px',
              lineHeight: '16px',
              fontFamily: 'sf-bold',
            }}
          />
          <span className="text-xs  text-[#CFF469]">Left</span>
        </>
      )}
      {status === 'end' && (
        <div className="text-xs text-white/60">This campaign has ended.</div>
      )}
    </div>
  );
};

export default memo(AppCountdown);
