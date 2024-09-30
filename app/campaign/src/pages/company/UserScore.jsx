import { useMemo } from 'react';

import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';

import clsx from 'clsx';

import { cn } from '@/utils/conf';
import useUserInfo from '@/hooks/useUserInfoQuery';

import TonLight from './icons/TonLight.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import TgIcon from '@/images/icon/tg-blue.svg?react';

const getAddressLogo = (addressType, rank) => {

  const addressLogoMap = {
    0: <EthIcon />,
    1: <TonLight />,
    2: <TgIcon />,
  };

  return addressLogoMap[ addressType ] || null;
};

export default function UserScore ({ list, className }) {

  const colorConfig = {
    userScoreBgColor: '#e4fa73',
    userScoreTextColor1: '#9A81E6',
    userScoreTextColor2: '#000000',
  }

  const userData = useUserInfo();

  const userScoreInfo = useMemo(() => {
    // 检查列表是否存在且非空
    if (!list || list.length === 0) {
      console.log("列表为空或不存在");
      return null;
    }

    // 检查用户数据是否存在
    if (!userData || !userData.user || !userData.user.userId) {
      console.log("用户数据不存在或不完整");
      return null;
    }

    // 在列表中查找用户
    const res = list.find(item => item.userId === userData.user.userId);

    // 用户不在列表中
    if (!res) {
      return {
        rank: list.length >= 500 ? '500+' : `${list.length}+`,
        pointNum: 0,
        addressType: null,
        address: null,
        walletUrl: null
      };
    }

    // 用户在列表中
    return {
      ...res,
      walletUrl: getAddressLogo(res.addressType, res.rank)
    };

  }, [ list, userData ]);

  return (userScoreInfo) ? (
    <div
      className={ clsx("p-4 flex items-center justify-between gap-x-3 rounded-2xl text-lg h-[60px] bg-[#e4fa73]") }
    >
      <span className={ clsx("flex-none w-8 pl-3 text-lg font-medium", `text-[${colorConfig.userScoreTextColor1}]`) }>
        { userScoreInfo.rank }
      </span>

      <div
        className={ clsx('flex-auto flex items-center gap-x-1 font-medium text-md') }
      >
        <span className='w-5'>{ userScoreInfo.walletUrl }</span>
        <span className={ clsx("text-lg ml-1 font-bold", `text-[${colorConfig.userScoreTextColor1}]`) }>
          { shortAddressV1(userScoreInfo.address ?? '') } (YOU)
        </span>

      </div>

      <span className={ clsx("flex-none font-bold", `text-[${colorConfig.userScoreTextColor2}]`) }>
        { formatImpact(userScoreInfo.pointNum) }
      </span>
    </div>
  ) : (
      <div className={ clsx("h-[52px] animate-pulse rounded-xl bg-[#e4fa73]/60")} />
  );
}
