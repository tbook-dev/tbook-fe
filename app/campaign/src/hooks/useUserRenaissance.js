import { useQuery, useMutation } from 'react-query';
import {
  getUserRenaissance,
  getUserLevel,
  getUserTpoints,
  joinSBTList,
  getWiseScore,
  getInvitedFriends,
} from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { getTMAsahreLink, getQueryParameter, TG_BOT_NAME } from '@/utils/tma';
import WebApp from '@twa-dev/sdk';

export default function useUserRenaissance() {
  const { user } = useUserInfoQuery();
  return useQuery('user-renaissance', () => getUserRenaissance(user?.userId), {
    retry: false,
    enabled: !!user.userId,
    retryOnMount: false,
  });
}

// leverl 1 :
// part1: has one new user invited
// part2: login ton wallet

// leverl 2 : has one new user invited and has one new user who has one new user invited
// leverl 3 : has one new user invited and has one new user who has one new user invited and has one new user who has one new user invited
export const useLevel = () => {
  const { user } = useUserInfoQuery();
  const userId = user?.userId;

  const { data, refetch } = useQuery('user-level', () => getUserLevel(userId), {
    retry: false,
    enabled: !!userId,
    retryOnMount: false,
  });
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
      const res = await joinSBTList(userId);
      if (res.code !== 200) {
        throw new Error(res.message);
      }
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const updateUserLevel = (data) => {
    console.log('to be replaced', data);
  };
  return {
    data,
    userLevel: data,
    refetchUserLevel: refetch,
    level1Mutation,
    level2Mutation,
    updateUserLevel,
  };
};

export const useUserRenaissanceKit = () => {
  const { user } = useUserInfoQuery();

  const userId = user?.userId;
  const { data, refetch } = useQuery(
    'user-tpoints',
    () => getUserTpoints(userId),
    {
      retry: false,
      enabled: !!userId,
      retryOnMount: false,
      staleTime: 2000,
    }
  );
  const { data: friendsRes } = useQuery(
    'tg-invite-friends',
    getInvitedFriends,
    {
      retry: false,
      enabled: !!userId,
      retryOnMount: false,
    }
  );

  const inviteTgUser = () => {
    if (!userId) return;
    const link = `https://t.me/${TG_BOT_NAME}?start=${userId}`;
    const text = `\n@${TG_BOT_NAME} Hi friend, 💅click to get your lucky cards. 🎉 \n 🔥 The thrilling scratch competition is now in full bloom! 💥\n🎁 Prize Pool: 💰NOTCoin、 💲20,000U \n\n ${link}`;
    const shareLink = `https://t.me/share/url?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(link)}`;
    WebApp.openTelegramLink(shareLink);
  };

  const friendsCnt = friendsRes?.data?.inviteCnt ?? 0;

  return {
    inviteTgUser,
    friends: friendsRes?.data?.invitees ?? [],
    friendsCnt,
    hasInvited: friendsCnt > 0,
    level2Competed: friendsCnt >= 5,
    tpoints: data?.tPoints ?? 0,
    luckyDrawCnt: data?.luckyDrawCnt ?? 0,
    refetchInfo: refetch,
    targetDate: data?.nextDistribution,
  };
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
