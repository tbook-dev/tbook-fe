import { useQuery, useMutation } from 'react-query';
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
} from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { TG_BOT_NAME } from '@/utils/tma';
import WebApp from '@twa-dev/sdk';
import { useCallback, useState, useEffect } from 'react';

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
  const { data: wiseData } = useQuery(
    'wise-score-event-renaissance',
    () => getWiseScore(userId),
    {
      retry: false,
      enabled: !!userId && data && data !== 1,
    }
  );
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

  const inviteTgUser = useCallback(() => {
    if (!userId) return;
    const link = `https://t.me/${TG_BOT_NAME}?start=${userId}`;
    // const text = `@${TG_BOT_NAME} \n Hi friend, get your 5 scratch cards🎉 \n 💅Scratch to earn 🪙 Notcoin 💵20,000U 🏆TPoints \n ${link}`;
    const text = [
      `\n@${TG_BOT_NAME}`,
      `Hi friend, get your 5 scratch cards🎉`,
      `\n💅Scratch to earn 🪙 Notcoin 💵20,000U 🏆TPoints`,
      link,
    ].join('\n');
    const shareLink = `https://t.me/share/url?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(link)}`;
    WebApp.openTelegramLink(shareLink);
  }, [userId]);
  return inviteTgUser;
};

export const useUserRenaissanceKit = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;
  const { data, refetch } = useUserScratchInfo();
  const { data: friendsRes } = useQuery(
    'tg-invite-friends',
    getInvitedFriends,
    {
      retry: false,
      enabled: !!userId,
    }
  );
  const inviteTgUser = useInviteTgUser();

  const friendsCnt = friendsRes?.data?.inviteCnt ?? 0;

  return {
    inviteTgUser,
    friends: friendsRes?.data?.invitees ?? [],
    friendsCnt,
    hasInvited: friendsCnt > 0,
    level2Competed: friendsCnt >= 5,
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
