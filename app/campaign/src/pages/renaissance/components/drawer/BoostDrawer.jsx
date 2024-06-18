import Drawer from '@/components/drawer';
import { useMemo } from 'react';
import moduleConf from '../../conf';
import { formatImpact } from '@tbook/utils/lib/conf';
import Button from '../ui/button';

const directBtn = [
  {
    cards: 1,
    tpoint: 150,
  },
  {
    cards: 3,
    tpoint: 300,
  },
  {
    cards: 10,
    tpoint: 800,
  },
];

export default function BoostDrawer ({ open, onCancel, data = {} }) {
  const textMap = useMemo(() => {
    return {
      multi: {
        title: 'Multi Scratch Cards',
        desc: 'Increase the amount of scratch cards you can earn every day.',
        tip: `+1 free Scratch Card every day at 0AM, UTC for level 1`,
      },
      per: {
        title: `1 More Card Per 10min`,
        desc: 'Increase the amount of scratch cards you can get every 10 minutes. Maximum 5 times per day.',
        tip: `+1 Scratch Card per 10 minutes for level 1`,
      },
      direct: {
        title: 'Buy Scratch Cards',
        desc: 'Maximum 10 Scratch Cards per day.',
        tip: null,
      },
    };
  }, [data]);

  return (
    <Drawer open={open} onCancel={onCancel}>
      <div className='text-white bg-black/10 px-8 pt-8 pb-16 rounded-t-2.5xl border-t-2 border-[#FFEAB5]'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold font-syne'>
            {textMap[data.type]?.title}
          </h2>
          <p className='text-xs'>{textMap[data.type]?.desc}</p>
        </div>
        {textMap[data.type]?.tip && (
          <div className='pt-5 text-xs'>{textMap[data.type]?.tip}</div>
        )}
        <div className='flex items-center justify-center py-6 text-[#FFDFA2] text-xl'>
          <img src={moduleConf.url.tpoint} className='size-7 me-1' />
          {formatImpact(400)}TPoints · Lvl1
        </div>
        {data.type === 'multi' && <Button className='w-full'>Level up</Button>}
        {data.type === 'per' && <Button className='w-full'>Level up</Button>}
        {data.type === 'direct' && (
          <div className='space-y-3'>
            {directBtn.map(d => {
              return (
                <Button className='w-full justify-between' key={d.cards}>
                  <span className='text-xs font-bold'>
                    {d.cards} Scratch Card{d.cards > 1 && 's'}
                  </span>
                  <div className='flex items-center text-[#FFDFA2] text-sm'>
                    <img src={moduleConf.url.tpoint} className='size-5 me-1' />
                    {d.tpoint} TPoints
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </Drawer>
  );
}
