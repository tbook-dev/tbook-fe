import { useQuery } from 'react-query';
import {
  getUserRenaissance,
  getUserLevel,
  getUserTpoints,
  updateLevel,
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

  const { data, refetch } = useQuery(
    'user-level',
    () => getUserLevel(user?.userId),
    {
      retry: false,
      enabled: !!user.userId,
      retryOnMount: false,
    }
  );
  return {
    data,
    userLevel: data,
    refetchUserLevel: refetch,
  };
};

export const useUserRenaissanceKit = () => {
  const { user } = useUserInfoQuery();
  const inviteTgUser = useCallback(() => {
    WebApp.openTelegramLink(
      `https://t.me/${TG_BOT_NAME}?start=${user?.userId}`
    );
  }, [user]);
  const { data } = useQuery(
    'user-tpoints',
    () => getUserTpoints(user?.userId),
    {
      retry: false,
      enabled: !!user.userId,
      retryOnMount: false,
    }
  );

  return { inviteTgUser, friends: [], tpoints: data };
};
