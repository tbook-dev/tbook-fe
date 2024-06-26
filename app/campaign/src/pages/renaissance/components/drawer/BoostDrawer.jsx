import Drawer from '@/components/drawer';
import { useMemo } from 'react';
import moduleConf from '../../conf';
import { formatImpact } from '@tbook/utils/lib/conf';
import Button from '../ui/button';
import { useBuyCardMutation, useBoostStatus } from '@/hooks/useUserRenaissance';
import { useState } from 'react';
import { cn } from '@/utils/conf';
export default function BoostDrawer ({
  open,
  onCancel,
  data = {},
  openMessage,
  list: directBtn = [],
}) {
  const { refetch: refetchBoostStatus, data: boostStatus } = useBoostStatus();
  const buyMutation = useBuyCardMutation();
  const [clickIdx, setClickIdx] = useState(-1);
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
  const handleDirectBuy = async (v, idx) => {
    setClickIdx(idx);
    try {
      const res = await buyMutation.mutateAsync(v.level);
      if (res.code === 200) {
        openMessage(
          `🌟🌟 You bought ${v.cardCnt} Scratch Card${
            v.cardCnt > 0 && 's'
          } 🌟🌟 `
        );
        refetchBoostStatus();
      } else {
        openMessage(res.message ?? 'Scratch for more TPoints to upgrade');
      }
    } catch (error) {
      openMessage(error.message ?? 'Scratch for more TPoints to upgrade');
    }
    onCancel();
    setClickIdx(-1);
  };

  return (
    <Drawer open={open} onCancel={onCancel}>
      <div className='text-white bg-black/10 px-8 pt-8 pb-16  space-y-6 rounded-t-2.5xl border-t-2 border-[#FFEAB5]'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold font-syne text-center'>
            {textMap[data.type]?.title}
          </h2>
          <p className={cn('text-xs', data.type === 'direct' && 'text-center')}>
            {textMap[data.type]?.desc}
          </p>
        </div>
        {textMap[data.type]?.tip && (
          <div className='pt-5 text-xs'>{textMap[data.type]?.tip}</div>
        )}
        {data.type !== 'direct' && (
          <div className='flex items-center justify-center pt-6 text-[#FFDFA2] text-xl'>
            <img src={moduleConf.url.tpoint} className='size-7 me-1' />
            {formatImpact(400)}TPoints · Lvl1
          </div>
        )}

        {data.type === 'multi' && <Button className='w-full'>Level up</Button>}
        {data.type === 'per' && <Button className='w-full'>Level up</Button>}
        {data.type === 'direct' && (
          <div className='space-y-3'>
            {directBtn.map((d, idx) => {
              const canBuy = 10 - boostStatus.todayBuyCardsNum >= d.cardCnt;
              return (
                <Button
                  isLoading={buyMutation.isLoading && clickIdx === idx}
                  className='w-full justify-between disabled:opacity-40'
                  key={d.cardCnt}
                  onClick={() => handleDirectBuy(d, idx)}
                  disabled={!canBuy}
                >
                  <span className='text-xs font-bold'>
                    {d.cardCnt} Scratch Card{d.cardCnt > 1 && 's'}
                  </span>
                  <div className='flex items-center text-[#FFDFA2] text-sm'>
                    <img src={moduleConf.url.tpoint} className='size-5 me-1' />
                    {d.pointsNum} TPoints
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
