import Layout from '@/layout/ton/Layout';
import useTopBoard from '@/hooks/useTopBoard';
import sucessSVG from '@/images/wise/sucess.svg';
import balloonSVG from '@/images/wise/balloon.svg';

const modlueConf = {
  title: 'WISE Score Leaderboard',
  decorate: [
    {
      url: sucessSVG,
      className: 'absolute w-[55px] h-[50px] top-[60px] left-9',
    },
    {
      url: balloonSVG,
      className: 'absolute size-[50px] right-8 top-[70px]',
    },
  ],
};

export default function TonWiseLeaderboard() {
  const { data } = useTopBoard({ pageSize: 10, num: 1 });
  return (
    <Layout className="flex flex-col">
      <div className="flex-auto w-full h-full px-5 mt-3 lg:px-0 mx-auto text-white bg-linear8">
        <div className="space-y-1 text-center mb-5 relative">
          <h2 className="pt-10 text-lg font-zen-dot w-[162px] mx-auto">
            {modlueConf.title}
          </h2>
          <p className="text-xs">{data?.updateAt}</p>
          {modlueConf.decorate.map((v) => (
            <img
              src={v.url}
              className={v.className}
              key={v.url}
              alt="decorate"
            />
          ))}
        </div>

        <div>xx</div>
      </div>
    </Layout>
  );
}
