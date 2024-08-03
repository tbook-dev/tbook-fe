import useWiseScore from '@/hooks/useWiseScore';
import Loading from '@/components/loading';
import WiseDetail from './wise-detail';
import WiseInfo from './components/wise-info';
import BottomNav from './components/bottomNav';

export default function TonWiseScore() {
  const { data } = useWiseScore();

  return (
    <div className="px-5 mt-3 min-h-[calc(100vh_-_160px)] pb-20 lg:px-0 max-w-md mx-auto">
      {!data ? (
        <Loading text="Aggregating metrics..." />
      ) : (
        <div className="space-y-16">
          <WiseInfo />
          <WiseDetail />
        </div>
      )}
      <BottomNav />
    </div>
  );
}
