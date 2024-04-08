import Layout from '@/layout/ton/Layout';
import useWiseScore from '@/hooks/useWiseScore';
import ScoreSkeleton from './score-skeleton';
import WiseInfo from './wise-info';
import WiseDetail from './wise-detail';

export default function TonWiseScore() {
  const { data, isLoading } = useWiseScore();
  return (
    <Layout>
      <div className="px-5 mt-3 lg:px-0 max-w-md mx-auto">
        {isLoading ? (
          <ScoreSkeleton />
        ) : (
          <div className="space-y-16">
            <WiseInfo />
            <WiseDetail
              wealth={data?.wealth}
              identity={data?.identity}
              social={data?.social}
              engagement={data?.engagement}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
