import { useQuery, useMutation } from 'react-query';
import {
  getUserRenaissance,
  getUserLevel,
  getUserTpoints,
  joinSBTList,
  getWiseScore,
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
    () => {
      if (userId) {
        getWiseScore(userId);
      }
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const level2Mutation = useMutation(
    () => {
      if (userId) {
        joinSBTList(userId);
      }
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
  };
};

export const useUserRenaissanceKit = () => {
  const { user } = useUserInfoQuery();

  const userId = user?.userId;
  const { data } = useQuery('user-tpoints', () => getUserTpoints(userId), {
    retry: false,
    enabled: !!userId,
    retryOnMount: false,
  });

  const inviteTgUser = useCallback(() => {
    WebApp.openTelegramLink(`https://t.me/${TG_BOT_NAME}?start=${userId}`);
  }, [userId]);

  return {
    inviteTgUser,
    friends: [],
    tpoints: data?.tPoints ?? 0,
    luckyDrawCnt: data?.luckyDrawCnt ?? 0,
  };
};

export const useCountdown = ({ targetDate, enabled = true }) => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
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
        setTimeLeft('00:00');
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate, enabled]);

  return timeLeft;
};
