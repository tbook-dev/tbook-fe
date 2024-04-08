import useWallet from '@/hooks/useWallet';
import useSocial from '@/hooks/useSocial';

const modlueConf = {
  title: 'Improve your WISE Score',
  acionMap: {
    evm: 'evm address',
    ton: 'TON address',
    twitter: 'X account',
    discord: 'discord account',
    telegram: 'telegram account',
  },
};

export default function Identity() {
  const { getWallets } = useWallet();
  const { socialList } = useSocial();
  const walletStatus = getWallets(['evm', 'ton']);
  const identityStatus = walletStatus
    .map((v) => ({ ...v, handle: v.connectHandle }))
    .concat(
      socialList.map((v) => ({
        ...v,
        handle: () => {
          v.loginFn(true);
        },
        type: v.name,
      }))
    )
    .filter((v) => !v.connected);

  return (
    <div className="pt-6 space-y-5">
      <h2 className="text-base font-zen-dot">{modlueConf.title}</h2>
      <div className="flex flex-col gap-y-4">
        {identityStatus.length > 0 ? (
          identityStatus.map((v) => {
            return (
              <button
                key={v.type}
                className="bg-gradient-to-br from-purple-500 to-pink-500 p-px flex font-medium text-sm rounded-lg"
                onClick={v.handle}
              >
                <span className="bg-[#0E0819] flex items-center justify-between flex-1 py-5 pl-5 pr-3 rounded-lg">
                  <span className="text-[#904BF6]">
                    Connect
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
  );
}
