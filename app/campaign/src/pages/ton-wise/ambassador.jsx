import Nav from './components/nav';
import Loading from '@/components/loading';
import { useAmbassadorLevel } from '@/hooks/useAmbassador';
import { cn } from '@/utils/conf';

const levelMap = {
  1: {
    wrap: 'bg-gradient-to-b from-[#8FC74E] to-[#5AB5AB] to-80%',
  },
  2: {
    wrap: 'bg-gradient-to-b from-[#8FC74E] to-[#5AB5AB] to-80%',
  },
};
export default function Ambassador() {
  const { data: level } = useAmbassadorLevel();
  const isLoaded = !!level;
  console.log({ level });
  return !isLoaded ? (
    <Loading />
  ) : (
    <div
      className={cn(
        'fixed inset-x-0 top-0 flex flex-col h-screen overflow-scroll pt-14 px-5 lg:px-0 mx-auto ',
        levelMap[level]?.wrap
      )}
    >
      <div className="flex-auto space-y-6 pb-32 relative">
        <Nav title="Ambassador Power" justify="center" to="/wise-score" />
      </div>
    </div>
  );
}
