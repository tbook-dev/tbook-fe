import {
  useWiseCreditInviteFriends,
  useWiseCreditInvite,
} from '@/hooks/useWiseScore';
import CopyIcon from '@/images/icon/svgr/copy.svg?react';
import { Typography } from 'antd';
import clsx from 'clsx';

const { Paragraph } = Typography;

export default function InviteFriends({ openDrawer }) {
  const { inviteCode, totalTimes, usedTimes, invitedList } =
    useWiseCreditInviteFriends();
  const { rawText } = useWiseCreditInvite();
  const hasNoData = !inviteCode;
  return (
    <div className="py-3 px-4 bg-white/5 rounded-lg space-y-3">
      <Paragraph
        copyable={{
          text: rawText,
          icon: <CopyIcon />,
        }}
        className="flex justify-between gap-x-1"
        style={{
          marginBottom: 0,
        }}
      >
        {hasNoData ? (
          <span className="bg-[#1f1f1f] w-12 h-6 animate-pulse" />
        ) : (
          <span className="text-base font-medium text-white">{inviteCode}</span>
        )}
      </Paragraph>
      <div className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          {hasNoData ? (
            <span className="size-7 rounded-full bg-white/10 animate-pulse" />
          ) : (
            invitedList.map((v) => {
              return (
                <img
                  src={v.avatar}
                  className="size-7 rounded-full object-center"
                  key={v.userId}
                />
              );
            })
          )}
          {invitedList.length < 3 && openDrawer ? (
            <span
              onClick={openDrawer}
              className={clsx(
                'size-7 rounded-full flex justify-center items-center backdrop-blur',
                'cursor-pointer bg-white/10'
              )}
            >
              +
            </span>
          ) : (
            invitedList.length === 0 && (
              <span
                className={clsx(
                  'size-7 rounded-full flex justify-center items-center backdrop-blur',
                  'cursor-not-allowed bg-white/5 opacity-60'
                )}
              />
            )
          )}
        </div>

        {hasNoData ? (
          <span className="bg-[#1f1f1f] w-12 h-7 bg-white/10 animate-pulse" />
        ) : (
          <div className={'text-xs font-thin'}>
            {usedTimes}/{totalTimes} Friends generated
          </div>
        )}
      </div>
    </div>
  );
}
