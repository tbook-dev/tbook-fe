import Drawer from '@/components/drawer';
import { ConfigProvider, message } from 'antd';
import moduleConf from '../../conf';
import Button from '../ui/button';
import { cn } from '@/utils/conf';
import { useInviteFriends, useInviteTgUser } from '@/hooks/useUserRenaissance';
import { useMemo } from 'react';
import social from '@/utils/social';
import { formatImpact, formatStandard } from '@tbook/utils/lib/conf';
import copy from 'copy-to-clipboard';

const conf = {
  title: 'Invite Friends',
  invites: [
    {
      title: 'Invite a friend',
      data: {
        tpoint: 500,
        scratch: 3,
      },
      img: <span className='text-[30px]'>🧑‍🤝‍🧑</span>,
    },
    {
      title: 'Invite a Premium friend',
      data: {
        tpoint: 2500,
        scratch: 15,
      },
      img: (
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.1947 9.41745L13.5621 2.84543C13.9506 2.08725 14.8898 1.78265 15.66 2.16509C15.9623 2.31523 16.2069 2.55804 16.3569 2.85694L19.5371 9.1949C19.7969 9.71265 20.3047 10.0662 20.8872 10.1346L27.5467 10.9175C28.4508 11.0238 29.0962 11.8315 28.9882 12.7215C28.9437 13.0881 28.7737 13.4288 28.5061 13.6873L23.2423 18.7734C23.0298 18.9788 22.9268 19.27 22.9639 19.5609L23.8386 26.4274C23.9639 27.4104 23.2559 28.3072 22.2574 28.4305C21.879 28.4772 21.4952 28.4059 21.1602 28.2265L15.599 25.2494C15.1966 25.034 14.7123 25.0278 14.3044 25.2329L8.54259 28.1292C7.73169 28.5368 6.73866 28.2201 6.3246 27.4218C6.16968 27.1231 6.11255 26.7845 6.16107 26.4526L6.62157 23.3022C6.8468 21.7614 7.81958 20.4248 9.22921 19.7194L15.6286 16.5169C15.7995 16.4314 15.8676 16.2257 15.7808 16.0575C15.7135 15.9272 15.5694 15.8534 15.4224 15.8741L7.59588 16.9726C6.39946 17.1405 5.18611 16.8095 4.24808 16.0594L1.64126 13.9747C0.897349 13.3798 0.784172 12.3039 1.38847 11.5715C1.66949 11.231 2.07283 11.0099 2.51492 10.9542L9.19804 10.1113C9.62668 10.0573 10.0001 9.79728 10.1947 9.41745Z'
            fill='url(#paint0_linear_7927_1300)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_7927_1300'
              x1='26.8462'
              y1='6.30769'
              x2='3.15385'
              y2='32.6923'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.139343' stopColor='#FA7FD8' />
              <stop offset='0.830677' stopColor='#1F90FF' />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ],
  friendTip: 'Friends Boosting',
  empty: 'Your supportive friends will show up here.',
};
export default function InviteFriends ({ open, onCancel }) {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    invitees,
    premiumInvitees,
    friendsCnt,
    inviteCnt,
    premiumCnt,
    isLoading,
  } = useInviteFriends();
  const { shareToChat, inviteLink, rawText, inviteTgUserFn } =
    useInviteTgUser();
  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: (
        <div className='px-3 py-4 backdrop-blur-md rounded-xl'>{content}</div>
      ),
      className: 'mt-10',
      onClose,
    });
  };
  const friends = useMemo(() => {
    return {
      list: [
        {
          avtors: invitees.map(a => a.avatar),
          show: inviteCnt > 0,
          text: `${formatImpact(inviteCnt)} Friends Supported`,
        },
        {
          avtors: premiumInvitees.map(a => a.avatar),
          show: premiumCnt > 0,
          text: `${formatImpact(premiumCnt)} Premium Friends Supported`,
        },
      ],
      cnt: formatImpact(friendsCnt),
    };
  }, [invitees, premiumInvitees, friendsCnt, inviteCnt]);
  const actionList = useMemo(() => {
    return [
      {
        name: 'Share to chat',
        svg: (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.7502 4.50025C15.7502 3.80287 15.9931 3.12726 16.4372 2.58957C16.8813 2.05188 17.4988 1.6857 18.1837 1.55399C18.8685 1.42229 19.5778 1.53328 20.1897 1.86788C20.8015 2.20249 21.2777 2.73981 21.5363 3.38746C21.7949 4.03511 21.8198 4.75263 21.6068 5.41666C21.3937 6.08068 20.9559 6.64973 20.3687 7.02596C19.7815 7.4022 19.0816 7.56211 18.3893 7.47822C17.697 7.39432 17.0556 7.07185 16.5752 6.56625L8.15423 11.2453C8.28289 11.7404 8.28289 12.2601 8.15423 12.7553L16.5752 17.4343C17.0785 16.9051 17.7574 16.5777 18.4848 16.5134C19.2122 16.4491 19.9381 16.6523 20.5263 17.0849C21.1146 17.5175 21.5249 18.1499 21.6803 18.8633C21.8357 19.5768 21.7255 20.3225 21.3705 20.9606C21.0154 21.5986 20.4398 22.0853 19.7515 22.3293C19.0633 22.5733 18.3097 22.558 17.632 22.2861C16.9543 22.0142 16.399 21.5044 16.0702 20.8524C15.7415 20.2004 15.6618 19.4508 15.8462 18.7443L7.42523 14.0663C7.01209 14.5012 6.47801 14.8024 5.89198 14.9308C5.30595 15.0591 4.6949 15.0089 4.13773 14.7864C3.58056 14.564 3.10288 14.1796 2.76637 13.683C2.42987 13.1863 2.25 12.6002 2.25 12.0003C2.25 11.4003 2.42987 10.8142 2.76637 10.3175C3.10288 9.82086 3.58056 9.43649 4.13773 9.21406C4.6949 8.99164 5.30595 8.94137 5.89198 9.06975C6.47801 9.19813 7.01209 9.49926 7.42523 9.93425L15.8462 5.25525C15.7823 5.00868 15.7501 4.75497 15.7502 4.50025Z'
              fill='#FFDFA2'
            />
          </svg>
        ),
        onClick: () => {
          shareToChat();
        },
      },
      {
        name: 'Copy link',
        svg: (
          <svg
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 3.375C8 2.339 8.84 1.5 9.875 1.5H10.25C11.2446 1.5 12.1984 1.89509 12.9017 2.59835C13.6049 3.30161 14 4.25544 14 5.25V7.125C14 8.161 14.84 9 15.875 9H17.75C18.7446 9 19.6984 9.39509 20.4017 10.0983C21.1049 10.8016 21.5 11.7554 21.5 12.75V16.125C21.5 17.16 20.66 18 19.625 18H9.875C9.37772 18 8.9008 17.8025 8.54917 17.4508C8.19754 17.0992 8 16.6223 8 16.125V3.375Z'
              fill='#FFDFA2'
            />
            <path
              d='M15.5 5.25041C15.5018 3.98895 15.0475 2.76937 14.221 1.81641C15.8943 2.25637 17.4207 3.13288 18.6441 4.35629C19.8675 5.57971 20.744 7.10611 21.184 8.77941C20.231 7.95289 19.0115 7.49865 17.75 7.50041H15.875C15.7755 7.50041 15.6802 7.4609 15.6098 7.39057C15.5395 7.32024 15.5 7.22486 15.5 7.12541V5.25041ZM5.375 6.00041H6.5V16.1254C6.5 17.0205 6.85558 17.879 7.48851 18.5119C8.12145 19.1448 8.97989 19.5004 9.875 19.5004H17V20.6254C17 21.6604 16.16 22.5004 15.125 22.5004H5.375C4.87772 22.5004 4.40081 22.3029 4.04917 21.9512C3.69754 21.5996 3.5 21.1227 3.5 20.6254V7.87541C3.5 6.83941 4.34 6.00041 5.375 6.00041Z'
              fill='#FFDFA2'
            />
          </svg>
        ),
        onClick: () => {
          copy(rawText);
          openMessage('You have copied. Send to your friend now!');
        },
      },
      {
        name: 'More',
        svg: (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.5 12C4.5 11.6022 4.65804 11.2206 4.93934 10.9393C5.22064 10.658 5.60218 10.5 6 10.5C6.39782 10.5 6.77936 10.658 7.06066 10.9393C7.34196 11.2206 7.5 11.6022 7.5 12C7.5 12.3978 7.34196 12.7794 7.06066 13.0607C6.77936 13.342 6.39782 13.5 6 13.5C5.60218 13.5 5.22064 13.342 4.93934 13.0607C4.65804 12.7794 4.5 12.3978 4.5 12ZM10.5 12C10.5 11.6022 10.658 11.2206 10.9393 10.9393C11.2206 10.658 11.6022 10.5 12 10.5C12.3978 10.5 12.7794 10.658 13.0607 10.9393C13.342 11.2206 13.5 11.6022 13.5 12C13.5 12.3978 13.342 12.7794 13.0607 13.0607C12.7794 13.342 12.3978 13.5 12 13.5C11.6022 13.5 11.2206 13.342 10.9393 13.0607C10.658 12.7794 10.5 12.3978 10.5 12ZM16.5 12C16.5 11.6022 16.658 11.2206 16.9393 10.9393C17.2206 10.658 17.6022 10.5 18 10.5C18.3978 10.5 18.7794 10.658 19.0607 10.9393C19.342 11.2206 19.5 11.6022 19.5 12C19.5 12.3978 19.342 12.7794 19.0607 13.0607C18.7794 13.342 18.3978 13.5 18 13.5C17.6022 13.5 17.2206 13.342 16.9393 13.0607C16.658 12.7794 16.5 12.3978 16.5 12Z'
              fill='#FFDFA2'
            />
          </svg>
        ),
        onClick: () => {
          navigator
            .share({
              text: rawText,
              url: inviteLink,
            })
            .catch(err => {
              if (err.message?.includes('Permission denied')) {
                openMessage(err.message);
              }
            });
        },
      },
    ];
  }, [inviteLink, rawText]);
  return (
    <Drawer open={open} onCancel={onCancel}>
      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: `rgba(255, 223, 162, 0.15)`,
              contentPadding: 0,
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
      <div className='text-white bg-white/10 px-8 pt-8 pb-16  space-y-6 rounded-t-2.5xl border-t-2 border-[#FFEAB5]'>
        <div className='space-y-3'>
          <h2 className='text-3xl font-bold font-syne text-center'>
            {conf.title}
          </h2>

          <div className='space-y-3'>
            {conf.invites.map(c => {
              return (
                <div
                  key={c.title}
                  className='flex items-center gap-x-2 px-4 py-3 rounded-lg border border-[#FFEAB5] bg-linear14'
                >
                  {c.img}
                  <div className='space-y-2'>
                    <h4 className='text-[#FFDFA2] text-base font-syne font-semibold'>
                      {c.title}
                    </h4>
                    <div className='flex items-center text-sm'>
                      <span className='text-[#F8C685]/60'>
                        Earn {formatStandard(c.data.tpoint)}
                      </span>
                      <img
                        src={moduleConf.url.tpoint}
                        className='size-3 mx-1'
                      />
                      <span className='text-[#F8C685]'>+ {c.data.scratch}</span>
                      <img
                        src={moduleConf.url.cat}
                        className='size-5 -mt-1 ml-1'
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={cn(friends.cnt > 0 ? 'space-y-3' : 'space-y-5')}>
          <h2 className='font-syne text-base'>{conf.friendTip}</h2>
          {isLoading ? (
            <div className='bg-[#FFDFA2]/60 h-5 animate-pulse' />
          ) : friends.cnt > 0 ? (
            <div className='space-y-3'>
              {friends.list
                .filter(f => f.show)
                .map(f => {
                  return (
                    <div
                      key={f.text}
                      className='flex items-center justify-between'
                    >
                      <div className='flex -space-x-1.5'>
                        {f.avtors.map((a, i) => (
                          <img
                            src={a}
                            key={i}
                            className='size-6 rounded-full object-cover object-center'
                          />
                        ))}
                      </div>

                      <div className='text-[#F8C685]/60 text-sm text-right flex-grow-0'>
                        {f.text}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className='text-[#FFDFA2] text-center'>{conf.empty}</div>
          )}

          <div className='pt-8 flex items-center justify-center gap-x-8 pb-3'>
            {actionList.map(a => {
              return (
                <button
                  className='btn-click flex-auto flex flex-col items-center gap-y-1'
                  key={a.name}
                  onClick={a.onClick}
                >
                  <span className='size-10 rounded-full bg-[#FFDFA2]/10 flex items-center justify-center'>
                    {a.svg}
                  </span>
                  {a.name}
                </button>
              );
            })}
          </div>

          <Button
            onClick={inviteTgUserFn}
            className='btn-click flex items-center justify-center gap-x-1 text-xs w-full h-10'
          >
            <social.tg className='fill-white' /> Invite friends
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
