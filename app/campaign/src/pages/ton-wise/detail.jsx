import useWiseScore from '@/hooks/useWiseScore';
import Loading from '@/components/loading';
import WiseDetail from './wise-detail';
import Insights from './components/insights';
import WiseInfo from './components/wise-info';
import BottomNav from './components/bottomNav';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TonWiseScore() {
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
