import WiseRadar from './wise-radar';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/conf';
import BackIcon from '@/images/icon/svgr/back.svg?react';
import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';

const WiseTab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { data, ...p } = useWiseScore();
  const handleTabClick = tabKey => {
    setActiveTab(tabKey);
  };
  const tabs = useMemo(
    () => [
      {
        key: 1,
        label: 'Score',
        component: (
          <div className='text-center'>
            <span className='text-[80px] text-color8'>
              {formatImpact(data?.totalScore ?? 0)}
            </span>
          </div>
        ),
      },
      {
        key: 2,
        label: 'Radar',
        component: <WiseRadar data={data} {...p} />,
      },
    ],
    [data]
  );
  const activeTabItem = tabs.find(item => item.key === activeTab);

  return (
    <div className='space-y-4'>
      <nav className='flex justify-between items-center'>
        <div className='text-2xl'>
          <BackIcon className='hidden' />
          WISE Credit
        </div>

        <ul className='flex w-max text-xs p-1 rounded-xl bg-white/10'>
          {tabs.map(item => (
            <li
              key={item.key}
              className={cn(
                'rounded-[10px] px-3 py-0.5 text-white/60 text-xs',
                item.key === activeTab ? 'text-white bg-white/20' : ''
              )}
              onClick={() => handleTabClick(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab ? activeTabItem?.label : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTabItem.component}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default WiseTab;
