import {
  useWiseCreditInviteFriends,
  useWiseCreditInvite,
} from '@/hooks/useWiseScore';
import CopyIcon from '@/images/icon/svgr/copy.svg?react';
import { Typography } from 'antd';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';

const { Paragraph } = Typography;

export default function InviteFriends({ openDrawer }) {
  const { inviteCode } = useWiseCreditInviteFriends();
  const { rawText } = useWiseCreditInvite();
  const hasNoData = !inviteCode;
  return (
    <div className="p-2 bg-white/5 space-y-4 rounded-xl text-center">
      <div className="space-y-3 px-4 py-2.5 bg-white/5 rounded-xl">
        <p className="text-sm">Invitation code</p>
        <Paragraph
          copyable={{
            text: rawText,
            icon: <CopyIcon />,
          }}
          className="flex justify-center items-center gap-x-1"
          style={{
            marginBottom: 0,
          }}
        >
          {hasNoData ? (
            <span className="bg-[#1f1f1f] w-12 h-9 animate-pulse" />
          ) : (
            <span className="font-medium text-color8 text-3xl">
              {inviteCode}
            </span>
          )}
        </Paragraph>
      </div>
      <div className="text-sm text-white/60">
        Each friend generating WISE Credit Score, you'll get
        <TpointIcon className="size-5 inline mx-1" />
        5,000 TPoints
      </div>
    </div>
  );
}
