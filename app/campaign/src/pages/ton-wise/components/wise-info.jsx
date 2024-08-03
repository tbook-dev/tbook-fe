import WiseRadar from './wise-radar';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/conf';
import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';
import WiseLevel from './wiseLevel';
import LeaderboardIcon from '@/images/icon/svgr/leaderboard.svg?react';
import { Link } from 'react-router-dom';

const WiseTab = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { data, ...p } = useWiseScore();
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };
  const tabs = useMemo(
    () => [
      {
        key: 1,
        label: 'Score',
        component: (
          <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[80px] leading-[80px]  text-color8">
                {formatImpact(data?.totalScore ?? 0)}
              </span>
              <Link
                to="/wise-score/leaderboard"
                className="flex items-center gap-x-1 px-2 py-1 rounded-lg bg-white/10 border border-white/10"
              >
                <LeaderboardIcon className="size-4" />
                Leaderboard
              </Link>
            </div>

            <WiseLevel totalScore={data?.totalScore ?? 0} />
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
  const activeTabItem = tabs.find((item) => item.key === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">WISE Credit Score</h2>
        <ul className="flex w-max text-xs p-1 rounded-xl bg-white/10">
          {tabs.map((item) => (
            <li
              key={item.key}
              className={cn(
                'rounded-[10px] px-3 py-0.5 text-white/60 text-xs cursor-pointer',
                item.key === activeTab ? 'text-white bg-white/20' : ''
              )}
              onClick={() => handleTabClick(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <main>
        <AnimatePresence mode="wait">
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
