import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';

const modlueConf = {
  title: 'Improve your WISE Score',
  acionMap: {
    discord: 'your telegram group/channel subscribers',
    telegram: 'your discord server subscribers',
  },
  recordTitle: 'Submission Record',
  recordMap: {
    1: 'Telegram Channel',
    2: 'Telegram Group',
    3: 'Discord Server',
  },
};

export default function Social() {
  const { data } = useWiseScore();

  const actionList = [
    {
      type: 'discord',
      actionName: modlueConf.acionMap.discord,
      handle: () => {
        alert(1);
      },
    },
    {
      type: 'telegram',
      actionName: modlueConf.acionMap.telegram,
      handle: () => {
        alert(1);
      },
    },
  ];
  const recordList = data?.record ?? [];
  return (
    <div className="pt-6 space-y-16">
      <div className="space-y-5">
        <h2 className="text-base font-zen-dot">{modlueConf.title}</h2>

        <div className="flex flex-col gap-y-4">
          {actionList.length > 0 ? (
            actionList.map((v) => {
              return (
                <button
                  key={v.type}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 p-px flex font-medium text-sm rounded-lg"
                  onClick={v.handle}
                >
                  <span className="bg-[#0E0819] flex items-center justify-between flex-1 p-4 gap-x-[30px] rounded-lg">
                    <span className="text-[#904BF6] text-left">
                      Submit
                      <span className="text-white ms-1">
                        {modlueConf.acionMap[v.type]}
                      </span>
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                        stroke="#A1A1AA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })
          ) : (
            <div>all done</div>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-base font-zen-dot">{modlueConf.recordTitle}</h2>

        <div className="flex flex-col gap-y-4">
          {recordList.length > 0 ? (
            recordList.map((v) => {
              return (
                <div
                  key={v.type}
                  className="bg-[rgb(144,75,246)]/[0.10] p-5 flex items-center justify-between gap-x-[30px] text-sm rounded-lg"
                >
                  <div className="flex flex-col gap-y-0.5">
                    <span className="text-white text-sm font-medium">
                      {v.name}
                    </span>
                    <span className="text-[#C0ABD9] text-xs">
                      {modlueConf.recordMap[v.type]}
                    </span>
                  </div>
                  <div className="text-[#C0ABD9]">
                    <span className="me-1 text-base font-medium text-white">
                      {formatImpact(v.fans)}
                    </span>
                    fan
                    {v.fans > 1 && 's'}
                  </div>
                </div>
              );
            })
          ) : (
            <div>all done</div>
          )}
        </div>
      </div>
    </div>
  );
}
