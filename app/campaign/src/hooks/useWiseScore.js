import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getWiseScore,
  reportRangerShare,
  getInvitedCreditFriends,
  getWiseScoreStatus,
  mintSBT,
  applyCode,
} from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { getDirectLink } from '@/utils/tma';
import { useCallback, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export default function useWiseScore() {
  const { user } = useUserInfoQuery();
  const { data, ...p } = useQuery(
    'wise-score',
    () => getWiseScore(user.userId),
    {
      // retry: false,
      enabled: !!user.userId,
      // retryOnMount: false,
      // refetchOnMount: false,
      staleTime: Infinity,
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
// api display
export const useWiseCreditInviteFriends = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { data, ...p } = useQuery(
    'wise-credit-invite-friends',
    getInvitedCreditFriends,
    {
      enabled: !!userId,
      refetchOnMount: false,
    }
  );
  return {
    data,
    ...p,
    inviteCode: data?.entity?.inviteCode,
    invitedList: data?.data?.invitedList ?? [],
  };
};
// drawer
export const useWiseCreditInvite = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { inviteCode } = useWiseCreditInviteFriends();
  const inviteLink = getDirectLink([3, inviteCode]);
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

export const useWiseHasWiseScore = () => {
  const queryClient = useQueryClient();
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { data, ...p } = useQuery(
    'wise-has-wise-score',
    () => getWiseScoreStatus(userId),
    {
      enabled: !!userId,
      refetchOnMount: false,
    }
  );
  useEffect(() => {
    if (data) {
      queryClient.setQueryDefaults('wise-has-wise-score', {
        staleTime: Infinity,
      });
    }
  }, [data]);
  return { data, ...p };
};

export const useJoinMutation = () => {
  return useMutation((data) => applyCode(data));
};

export const useMintSBTMutation = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  return useMutation(() => mintSBT(userId));
};
