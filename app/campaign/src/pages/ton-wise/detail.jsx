import useWiseScore from '@/hooks/useWiseScore';
import Loading from '@/components/loading';
import WiseDetail from './wise-detail';
import Insights from './components/insights';
import WiseInfo from './components/wise-info';
import BottomNav from './components/bottomNav';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TonSocietyIcon from '@/images/icon/svgr/ton-society2.svg?react';
import { Link } from 'react-router-dom';
import HotIcon from '@/images/icon/svgr/hot.svg?react';
import useDeFi from '@/hooks/useDeFi';

export default function TonWiseScore() {
  const { data: defi } = useDeFi();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };
  const { data } = useWiseScore();

  return (
    <div className="px-5 mt-3 min-h-[calc(100vh_-_160px)] pb-20 lg:px-0 max-w-md mx-auto">
      {!data ? (
        <Loading text="Aggregating metrics..." />
      ) : (
        <div className="space-y-7">
          <WiseInfo activeTab={activeTab} handleTabClick={handleTabClick} />
          {activeTab === 1 && defi && (
            <div className="space-y-3">
              <h2 className="text-base w-[230px]">
                Collect These Credentials to Improve Your Credit!
              </h2>
              <Link
                to={`/${defi?.projectUrl}/${defi?.campaignId}`}
                className="px-4 py-2 flex gap-x-2 items-center rounded-2xl bg-[#ABEDBB] text-[#22306D] relative overflow-hidden"
              >
                <HotIcon className="absolute right-0 -top-1.5" />
                <TonSocietyIcon />
                <div className="space-y-2">
                  <h2 className="text-sm">DeFi Investment</h2>
                  <div className="text-xs flex items-center gap-x-1">
                    <div className="font-bold px-2 py-1 rounded bg-[#CFF469]">
                      TON Investor
                    </div>
                    <div className="font-bold px-2 py-1 rounded bg-[#F36EBD]">
                      SBTs
                    </div>
                    can improve by 10-80K
                  </div>
                </div>
              </Link>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {activeTab === 1 && <Insights />}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {activeTab === 2 && <WiseDetail />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
