import moduleConf from '../../conf';
import { cn } from '@/utils/conf';
import { useInviteFriends, useInviteTgUser } from '@/hooks/useUserRenaissance';
import { useMemo } from 'react';
import { formatImpact, formatStandard } from '@tbook/utils/lib/conf';
import ShareDrawer from '@/components/drawer/share';
import TgPremiumIcon from '@/images/icon/svgr/tg-premium.svg?react';

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
      img: <TgPremiumIcon width='30px' height='30px' />,
    },
  ],
  friendTip: 'Friends Boosting',
  empty: 'Your supportive friends will show up here.',
};
export default function InviteFriends ({ open, onCancel }) {
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

  return (
    <ShareDrawer
      open={open}
      onCancel={onCancel}
      shareToChat={shareToChat}
      inviteLink={inviteLink}
      rawText={rawText}
      inviteTgUserFn={inviteTgUserFn}
    >
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
                    <img src={moduleConf.url.tpoint} className='size-3 mx-1' />
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
      </div>
    </ShareDrawer>
  );
}
