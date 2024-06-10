import { useQuery } from 'react-query';
import { getUserRenaissance, reportShareCode } from '@/api/incentive';
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
  const updateUserLevel = useCallback((userLevel) => {
    return setUserLevel(userLevel + 1);
  }, []);
  console.log({ WebApp });

  const inviteTgUser = useCallback(() => {
    return WebApp.openTelegramLink(
      getTMAsahreLink({
        type: 'renaissance',
        code: inviteCode,
      })
    );
  }, [inviteCode]);

  return {
    hasInvited: false,
    userLevel,
    updateUserLevel,
    inviteTgUser,
  };
};

export const useReportCode = () => {
  useEffect(() => {
    const code = getQueryParameter(window.location.href, 'code');
    if (code) {
      reportShareCode({ code });
    }
  }, []);
};
