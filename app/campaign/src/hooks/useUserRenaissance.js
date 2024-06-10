import { useQuery } from 'react-query';
import { getUserRenaissance, updateLevel } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { getTMAsahreLink, getQueryParameter } from '@/utils/tma';
import WebApp from '@twa-dev/sdk';

export default function useUserRenaissance() {
  const { user } = useUserInfoQuery();
  return useQuery('user-renaissance', () => getUserRenaissance(user.userId), {
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
  const { data } = useUserRenaissance();
  const [userLevel, setUserLevel] = useState(1);
  // const userLevel = useMemo(() => {
  //   if (!data) {
  //     return 1;
  //   }
  //   if (!data.hasInvited) {
  //     return 1;
  //   } else if (!data.hasWiseScore) {
  //     return 2;
  //   } else {
  //     return 3;
  //   }
  // }, [data]);
  const inviteCode = '12345';
  const updateUserLevel = useCallback(() => {
    // to
    console.log('update api todo');
    return setUserLevel((userLevel) => userLevel + 1);
  }, []);

  const inviteTgUser = useCallback(() => {
    return WebApp.openTelegramLink(
      getTMAsahreLink({
        type: 'renaissance',
        code: inviteCode,
      })
    );
  }, [inviteCode]);

  return {
    hasInvited: true,
    userLevel,
    updateUserLevel,
    inviteTgUser,
  };
};

export const useReportCode = () => {
  useEffect(() => {
    const code = getQueryParameter(window.location.href, 'code');
    if (code) {
      updateLevel({ code, level: 1 });
    }
  }, []);
};
