import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getUserRenaissance,
  getUserLevel,
  getUserTpoints,
  joinSBTList,
  getWiseScore,
  getInvitedFriends,
  getBugCardsList,
  buyCard,
  getBoostStatus,
  checkTask,
} from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import useWiseScore from './useWiseScore';
import { TG_BOT_NAME } from '@/utils/tma';
import WebApp from '@twa-dev/sdk';
import { useCallback, useState, useEffect, useMemo } from 'react';

export default function useUserRenaissance() {
  const { user } = useUserInfoQuery();
  return useQuery('user-renaissance', () => getUserRenaissance(user?.userId), {
    retry: false,
    enabled: !!user.userId,
  });
}

export const useLevel = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;

  const { data, refetch } = useQuery('user-level', () => getUserLevel(userId), {
    retry: false,
    enabled: !!userId,
  });
  const { data: wiseData } = useWiseScore();
  const level1Mutation = useMutation(
    async () => {
      return await getWiseScore(userId);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const level2Mutation = useMutation(
    async () => {
      await joinSBTList(userId);
      // const res = await joinSBTList(userId);
      // if (res.code !== 200) {
      //   throw new Error(res.message);
      // }
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    data,
    userLevel: data,
    refetchUserLevel: refetch,
    level1Mutation,
    level2Mutation,
    totalWiseScore: wiseData?.totalScore,
  };
};

export const useUserScratchInfo = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  return useQuery('user-tpoints', () => getUserTpoints(userId), {
    retry: false,
    enabled: !!userId,
    staleTime: 2000,
  });
};

export const useInviteTgUser = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const inviteLink = `https://t.me/${TG_BOT_NAME}?start=${userId}`;
  const rawText = [
    `\n@${TG_BOT_NAME}`,
    `Hi friend, get your 5 scratch cards🎉`,
    `\n💅Scratch to earn 🪙 Notcoin 💵20,000U 🏆TPoints`,
    inviteLink,
  ].join('\n');
  const shareLink = useMemo(() => {
    if (!userId) return '';
    // const text = `@${TG_BOT_NAME} \n Hi friend, get your 5 scratch cards🎉 \n 💅Scratch to earn 🪙 Notcoin 💵20,000U 🏆TPoints \n ${link}`;

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
export const useInviteFriends = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { data: res, ...p } = useQuery('tg-invite-friends', getInvitedFriends, {
    retry: false,
    enabled: !!userId,
  });
  const friendsCnt = res?.data?.totalCnt ?? 0;
  const invitees = res?.data?.invitees ?? [];
  const premiumInvitees = res?.data?.premiumInvitees ?? [];
  const friends = [...invitees, ...premiumInvitees];
  return {
    friendsCnt,
    invitees,
    premiumInvitees,
    friends,
    inviteCnt: res?.data?.inviteCnt ?? 0,
    premiumCnt: res?.data?.premiumCnt ?? 0,
    data: res,
    ...p,
  };
};
export const useUserRenaissanceKit = () => {
  const { data, refetch } = useUserScratchInfo();
  // const { data: friendsRes } = useInviteFriends();
  const { inviteTgUserFn } = useInviteTgUser();

  // const friendsCnt = friendsRes?.data?.inviteCnt ?? 0;

  return {
    inviteTgUser: inviteTgUserFn,
    // friends: friendsRes?.data?.invitees ?? [],
    // friendsCnt,
    // hasInvited: friendsCnt > 0,
    // level2Competed: friendsCnt >= 5,
    tpoints: data?.tPoints ?? 0,
    luckyDrawCnt: data?.luckyDrawCnt ?? 0,
    hashLuckyCardCntData: !!data,
    refetchInfo: refetch,
    targetDate: data?.nextDistribution,
    isInSBTWhiteList: data && data.isInSBTWhiteList,
  };
};

export const useBuyCardList = () => {
  return useQuery('buy-card-list', getBugCardsList, {
    staleTime: Infinity,
  });
};

export const useBoostStatus = () => {
  const { userLogined } = useUserInfoQuery();

  const { data, ...p } = useQuery('use-card-status', getBoostStatus, {
    enabled: userLogined,
  });
  const perNextUnused = data?.dailyTimeBonus?.unused ?? 0;
  return {
    data: {
      isAbleToBuyCards: data?.isAbleToBuyCards ?? false,
      hasDailyFreeCards: data?.dailyFree?.remains + perNextUnused > 0,
      hasDailyTimeBonus: data?.dailyTimeBonus?.unClaimed > 0,
      daiyFreeCards: data?.dailyFree?.remains ?? 0,
      daiyFreeTotalCards: data?.dailyTimeBonus?.max ?? 5,
      perNextDistribution: data?.dailyTimeBonus?.nextDistribution,
      perNextCountStep: data?.dailyTimeBonus?.step ?? 0,
      dailyTimeBonusMax: data?.dailyTimeBonus?.max ?? 0,
      perNextUnused: data?.dailyTimeBonus?.unused ?? 0,
      todayBuyCardsNum: data?.todayBuyCardsNum ?? 0,
    },
    isLoaded: !!data,
    ...p,
  };
};

export const useBuyCardMutation = () => {
  return useMutation(async (...args) => {
    return await buyCard(...args);
  });
};

export const useCountdown = ({ targetDate, enabled = true, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = targetDate;
      const difference = target - now;

      if (difference > 0) {
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
            2,
            '0'
          )}`
        );
      } else {
        onEnd?.();
        setTimeLeft('00:00');
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate, enabled]);

  return timeLeft;
};

export const useEarnCheck = () => {
  const queryClient = useQueryClient();
  const { data: channelChecked, isLoading: channelCheckedLoading } = useQuery(
    'tbook-channel-checked',
    () => checkTask('join:channel:tb')
  );
  const { data: groupChecked, isLoading: groupCheckedLoading } = useQuery(
    'tbook-group-checked',
    () => checkTask('join:group:tb')
  );
  const { data: boostChecked, isLoading: boostCheckedLoading } = useQuery(
    'tbook-boost-checked',
    () => checkTask('boost:tb')
  );
  useEffect(() => {
    if (channelChecked?.finished) {
      queryClient.setQueryDefaults('tbook-channel-checked', {
        staleTime: Infinity,
      });
    }
  }, [channelChecked]);
  useEffect(() => {
    if (groupChecked?.finished) {
      queryClient.setQueryDefaults('tbook-group-checked', {
        staleTime: Infinity,
      });
    }
  }, [groupChecked]);
  useEffect(() => {
    if (boostChecked?.finished) {
      queryClient.setQueryDefaults('tbook-boost-checked', {
        staleTime: Infinity,
      });
    }
  }, [boostChecked]);
  return {
    channel: {
      finished: channelChecked?.finished,
      isLoading: channelCheckedLoading,
    },
    group: {
      finished: groupChecked?.finished,
      isLoading: groupCheckedLoading,
    },
    boost: {
      finished: boostChecked?.finished,
      isLoading: boostCheckedLoading,
    },
  };
};
