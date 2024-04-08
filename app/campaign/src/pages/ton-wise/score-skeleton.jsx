import Lottie from 'lottie-react';
import dataJSON from '@/images/lottie/wise-score-skeleton.json';

const moduleConf = {
  title: 'Calculating your WISE score',
};
export default function ScoreSkeleton() {
  return (
    <div className="space-y-20">
      <h2 className="text-white text-base font-zen-dot">{moduleConf.title}</h2>
      <Lottie
        loop
        autoplay={true}
        animationData={dataJSON}
        style={{ height: '293px', width: '251px', margin: '0 auto' }}
      />
    </div>
  );
}
