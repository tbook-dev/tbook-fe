import {
  useWiseCreditInviteFriends,
  useWiseCreditInvite,
} from '@/hooks/useWiseScore';
import CopyIcon from '@/images/icon/svgr/copy.svg?react';
import { Typography } from 'antd';
const { Paragraph } = Typography;

export default function InviteFriends() {
  const { inviteCode, invitedList, isLoading } = useWiseCreditInviteFriends();
  const { rawText } = useWiseCreditInvite();
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
        {isLoading ? (
          <span className="bg-[#1f1f1f] w-12 h-6" />
        ) : (
          <span className="text-base font-medium text-white">{inviteCode}</span>
        )}
      </Paragraph>
      <div className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          {isLoading ? (
            <span className="size-7 rounded-full bg-white/10 animate-spin" />
          ) : (
            invitedList.map((v) => {
              return (
                <img
                  src={v.avator}
                  className="size-7 rounded-full object-center"
                  key={v.userId}
                />
              );
            })
          )}
          {invitedList.length < 3 && (
            <span className="size-7 rounded-full bg-white/10 flex justify-center items-center">
              +
            </span>
          )}
        </div>

        <div className="text-xs font-thin">
          {invitedList.length}/3 Friends generated
        </div>
      </div>
    </div>
  );
}
