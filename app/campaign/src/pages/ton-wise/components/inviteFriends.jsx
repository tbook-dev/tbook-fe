import {
  useWiseCreditInviteFriends,
  useWiseCreditInvite,
} from '@/hooks/useWiseScore';
import CopyIcon from '@/images/icon/svgr/copy.svg?react';
import { Typography } from 'antd';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';

const { Paragraph } = Typography;

export default function InviteFriends() {
  const { inviteCode } = useWiseCreditInviteFriends();
  const { rawText } = useWiseCreditInvite();
  const hasNoData = !inviteCode;
  return (
    <div className="p-2 bg-white/5 space-y-4 rounded-xl text-center">
      <div className="space-y-3 px-4 py-2.5 bg-white/5 rounded-xl">
        <p className="text-sm">Invitation code</p>
        {hasNoData ? (
          <div className="bg-[#493e3e] w-40 h-9 mx-auto animate-pulse" />
        ) : (
          <Paragraph
            copyable={{
              text: rawText,
              icon: <CopyIcon fill="#999" />,
            }}
            className="flex justify-center items-center gap-x-1"
            style={{
              marginBottom: 0,
            }}
          >
            <span className="font-medium text-color8 text-3xl">
              {inviteCode}
            </span>
          </Paragraph>
        )}
      </div>
      <div className="text-sm text-white/60">
        Improve your credit by inviting.
      </div>
    </div>
  );
}
