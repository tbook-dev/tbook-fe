import { useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import { Tooltip } from 'antd';
export default function Wealth (props) {
  const actionList = useMemo(() => {
    return [
      {
        title: 'New Money on TON',
        tip: null,
        onClick: () => {
          WebApp.openTelegramLink(`https://t.me/ston_app_bot/swap`);
        },
        isFinished: false,
      },
      {
        title: 'New Money on ETH',
        tip: 'Deposit ETH into your wallet to improve your wealth score.',
        isFinished: false,
      },
    ];
  }, []);
  return (
    <div className='space-y-1'>
      {actionList.map(a => {
        return (
          <div
            key={a.title}
            className='flex justify-between items-center border border-white/30 rounded-lg px-5 py-1.5 text-sm text-white'
          >
            {a.title}

            {a.isFinished ? (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M4.5 12C4.5 7.85769 7.85769 4.5 12 4.5C16.1423 4.5 19.5 7.85769 19.5 12C19.5 16.1423 16.1423 19.5 12 19.5C7.85769 19.5 4.5 16.1423 4.5 12ZM14.7769 10.6046C14.8231 10.5431 14.8565 10.473 14.8751 10.3984C14.8938 10.3238 14.8974 10.2463 14.8857 10.1703C14.8739 10.0943 14.8471 10.0214 14.8068 9.95592C14.7665 9.89044 14.7135 9.83367 14.651 9.78896C14.5884 9.74425 14.5175 9.71249 14.4425 9.69556C14.3675 9.67863 14.2899 9.67686 14.2142 9.69036C14.1385 9.70385 14.0663 9.73235 14.0018 9.77416C13.9372 9.81598 13.8817 9.87027 13.8385 9.93385L11.3492 13.4185L10.1 12.1692C9.99063 12.0673 9.84598 12.0118 9.69652 12.0145C9.54706 12.0171 9.40446 12.0777 9.29875 12.1834C9.19305 12.2891 9.1325 12.4317 9.12987 12.5811C9.12723 12.7306 9.18271 12.8752 9.28462 12.9846L11.0154 14.7154C11.0746 14.7746 11.146 14.8201 11.2246 14.849C11.3032 14.8778 11.3871 14.8891 11.4706 14.8823C11.554 14.8754 11.635 14.8504 11.7078 14.8091C11.7806 14.7678 11.8436 14.7112 11.8923 14.6431L14.7769 10.6046Z'
                  fill='#7163E8'
                />
              </svg>
            ) : a.tip ? (
              <Tooltip title={a.tip}>
                <button className='font-medium px-3 py-1.5 rounded bg-[#904BF6]  hover:opacity-70'>
                  Improve
                </button>
              </Tooltip>
            ) : (
              <button
                onClick={a.onClick}
                className='font-medium px-3 py-1.5 rounded bg-[#904BF6] hover:opacity-70 btn-click'
              >
                Improve
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
