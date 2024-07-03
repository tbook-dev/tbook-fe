import { useQuery } from 'react-query';
import { getWiseScore } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { TG_BOT_NAME, getDirectLink } from '@/utils/tma';
import { useCallback, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';

export default function useWiseScore() {
  const { user } = useUserInfoQuery();
  const { data, ...p } = useQuery(
    'wise-score',
    () => getWiseScore(user.userId),
    {
      // retry: false,
      enabled: !!user.userId,
      retryOnMount: false,
      refetchOnMount: false,
    }
  );
  return {
    data,
    engagementScore: data?.engagementScore?.score ?? 0,
    socialScore: data?.socialScore?.score ?? 0,
    identityScore: data?.identityScore?.score ?? 0,
    wealthScore: data?.wealthScore?.score ?? 0,
    ...p,
  };
}

export const useInviteTgUser = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const inviteLink = getDirectLink([3]);
  const rawText = [
    `🎁I have obtained the WISE Credential  and 🎉 improved my WISE Credit Score.`,
    `\n🔥Come on to obtain yours!`,
    inviteLink,
  ].join('\n');
  const shareLink = useMemo(() => {
    if (!userId) return '';
    const link = `https://t.me/share/url?text=${encodeURIComponent(
      rawText
    )}&url=${encodeURIComponent(inviteLink)}`;
    return link;
  }, [userId]);
  const inviteTgUser = useCallback(() => {
    if (!shareLink) return;
    WebApp.openTelegramLink(shareLink);
  }, [shareLink]);
  const shareToChat = useCallback(() => {
    // todo
    WebApp.switchInlineQuery(`invite:${userId}`, [
      'users',
      'bots',
      'groups',
      'channels',
    ]);
  }, [userId]);
  return {
    inviteTgUserFn: inviteTgUser,
    shareText: shareLink,
    shareToChat,
    rawText,
    inviteLink,
  };
};
