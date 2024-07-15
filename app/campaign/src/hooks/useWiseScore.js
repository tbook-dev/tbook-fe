import { useQuery } from 'react-query';
import {
  getWiseScore,
  reportRangerShare,
  getInvitedCreditFriends,
} from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { getDirectLink } from '@/utils/tma';
import { useCallback, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import { TG_BOT_NAME } from '@/utils/tma';

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

export const useInviteTgUser = (type) => {
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
    WebApp.switchInlineQuery(`share:${userId}:${type}`, [
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

export const useRangerReport = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const reportRangerShareFn = useCallback(
    (type) => {
      if (userId) {
        reportRangerShare(userId, type);
      }
    },
    [userId]
  );
  return {
    reportRangerShareFn,
  };
};

// drawer
export const useWiseCreditInvite = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const inviteLink = `https://t.me/${TG_BOT_NAME}?start=${userId}`;
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
  return {
    inviteTgUser,
    shareText: shareLink,
    rawText,
    inviteLink,
  };
};

// api display
export const useWiseCreditInviteFriends = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { data, ...p } = useQuery(
    'wise-credit-invite-friends',
    getInvitedCreditFriends,
    {
      enabled: !!userId,
    }
  );
  console.log({ data });
  return {
    data,
    ...p,
    inviteCode: data?.data?.inviteCode,
    invitedList: data?.data?.invitedList ?? [],
  };
};
