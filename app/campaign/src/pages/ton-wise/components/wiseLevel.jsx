import WiseTag, { getWidth } from './wiseTag';
import { motion } from 'framer-motion';

export default function WiseLevel({ totalScore = 0 }) {
  const width = getWidth(totalScore);

  return (
    <div className="space-y-2">
      <div className="w-full relative h-1 rounded-full bg-white/20">
        <motion.div
          className="w-10 bg-linear16 rounded-full absolute inset-y-0 bottom-0"
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ ease: 'easeOut', duration: 2 }}
        />
      </div>
      <div className="font-thin relative">
        <span className="text-xs text-white/80">Your WISE Level</span>
        <WiseTag
          className="text-xs absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: width }}
          value={totalScore}
        />
      </div>
    </div>
  );
}
