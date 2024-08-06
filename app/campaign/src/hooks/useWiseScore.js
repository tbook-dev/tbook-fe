import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getWiseScore,
  reportRangerShare,
  getInvitedCreditFriends,
  hasInviteCode,
  getWiseScoreStatus,
  mintSBT,
  getSBTList,
  applyCode,
} from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { getDirectLink } from '@/utils/tma';
import { useCallback, useMemo, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

export const useWiseGobal = () => {
  return useQuery(
    'golbal:wise',
    () => {
      return {
        showGen: true,
      };
    },
    {
      staleTime: Infinity,
      initialData: { showGen: true },
    }
  );
};
export const useWiseGobalMutation = () => {
  const queryClient = useQueryClient();
  const { data } = useWiseGobal();
  return (v) => {
    queryClient.setQueryData('golbal:wise', Object.assign({}, data, v));
  };
};

export default function useWiseScore() {
  const { userLogined } = useUserInfoQuery();
  const { data, ...p } = useQuery('wise-score', () => getWiseScore(), {
    // retry: false,
    enabled: userLogined,
    // retryOnMount: false,
    // refetchOnMount: false,
    staleTime: Infinity,
  });
  return {
    data: data?.userWiseScore,
    totalScore: data?.userWiseScore?.totalScore ?? 0,
    engagementScore: data?.userWiseScore?.engagementScore?.score ?? 0,
    socialScore: data?.userWiseScore?.socialScore?.score ?? 0,
    identityScore: data?.userWiseScore?.identityScore?.score ?? 0,
    wealthScore: data?.userWiseScore?.wealthScore?.score ?? 0,
    isLoaded: !!data,
    isFirstCreate: !!data?.userWiseScore?.isFirstCreate,
    isGranted: data?.code === 200,
    ...p,
  };
}

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
  const client = useQueryClient();
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
  const previousHas = client.getQueryData('has-wise-credit-invite-code');

  useEffect(() => {
    if (data?.success && previousHas?.hasCode === false) {
      client.setQueryData('has-wise-credit-invite-code', { hasCode: true });
    }
  }, [data, previousHas]);
  return {
    data,
    ...p,
    inviteCode: data?.entity?.code,
    totalTimes: data?.entity?.totalTimes ?? 3,
    usedTimes: data?.entity?.usedTimes ?? 0,
    invitedList: data?.entity?.invitees ?? [],
  };
};
// drawer
export const useWiseCreditInvite = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { inviteCode } = useWiseCreditInviteFriends();
  const inviteLink = getDirectLink([3, inviteCode]);
  const rawText = [
    `Checkout my WISE Credit Score! 🌟`,
    `\nCheck yours and claim a WISE Credit SBT on Ton Society🤩`,
    inviteLink,
  ].join('\n');
  const shareLink = useMemo(() => {
    if (!userId) return '';
    const link = `https://t.me/share/url?text=${encodeURIComponent(
      rawText
    )}&url=${encodeURIComponent(inviteLink)}`;
    return link;
  }, [userId, inviteLink]);
  const inviteTgUser = useCallback(() => {
    if (!shareLink) return;
    WebApp.openTelegramLink(shareLink);
  }, [shareLink]);
  const shareToChat = useCallback(() => {
    // todo
    WebApp.switchInlineQuery(`wise:invite:${userId}`, [
      'users',
      'bots',
      'groups',
      'channels',
    ]);
  }, [userId]);
  return {
    inviteTgUser,
    shareText: shareLink,
    rawText,
    inviteLink,
    shareToChat,
  };
};

export const useWiseHasWiseScore = () => {
  const queryClient = useQueryClient();
  const { user } = useUserInfoQuery();
  const { data, ...p } = useQuery(
    'wise-has-wise-score',
    () => getWiseScoreStatus(user?.userId),
    {
      enabled: !!user?.userId,
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

const statusToLevelMap = {
  minting: 2,
  hasMinted: 3,
  error: 4,
};

export const useSBTList = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { data, ...p } = useQuery('sbt-list', getSBTList, {
    enabled: !!userId,
  });

  return {
    list: [
      { type: 1, level: statusToLevelMap[data?.status] ?? 1, link: data?.link },
    ],
    data,
    ...p,
  };
};

export const useShareRangerInvite = (type) => {
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

export function useWiseScoreKit() {
  const client = useQueryClient();
  const invalidateWiseScore = client.invalidateQueries('wise-score');
  return { invalidateWiseScore };
}

export const useHasWiseCreditInviteCode = () => {
  const { data, ...p } = useQuery(
    'has-wise-credit-invite-code',
    hasInviteCode,
    {
      staleTime: Infinity,
      placeholderData: { hasCode: true },
    }
  );
  return {
    data,
    hasInviteCode: data?.hasCode,
    ...p,
  };
};
