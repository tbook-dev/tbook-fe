import { useQuery } from 'react-query';
import { checkGameAirDrapData } from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';

// const statusMap = {
//   notStarted: 1,
//   ongoing: 2,
//   ended: 3,
// };
const getStatus = (cof = {}) => {
  const { start, end } = cof;
  const now = dayjs();
  // console.log('end------', dayjs(end).format('MM D, YYYY'));
  // console.log('start------', dayjs(start).format('MM D, YYYY'));
  return 2;
  if (now.isBefore(dayjs(start))) {
    return 1;
  } else if (now.isAfter(dayjs(end))) {
    return 3;
  } else {
    return 2;
  }
};
export default function useGameCheckAirdrop() {
  const { userLogined } = useUserInfo();
  const { data, ...props } = useQuery(
    ['game-airDrop', userLogined],
    () => checkGameAirDrapData(),
    {
      staleTime: 5 * 60 * 1000,
    }
  );
  const checkList = [
    {
      title: 'phase 1',
      phaseNum: 1,
      num: data?.s1Amount,
      endTime: data?.s1Period?.end,
      status: getStatus(data?.s1Period),
    },
    {
      title: 'phase 2',
      phaseNum: 2,
      num: data?.s2Amount,
      endTime: data?.s2Period?.end,
      status: getStatus(data?.s2Period),
    },
    {
      title: 'phase 3',
      phaseNum: 3,
      num: data?.s3Amount,
      endTime: data?.s3Period?.end,
      status: getStatus(data?.s3Period),
    },
    {
      title: 'phase 4',
      phaseNum: 4,
      num: data?.s4Amount,
      endTime: data?.s4Period?.end,
      status: getStatus(data?.s4Period),
    },
  ];
  const totalNum = checkList
    .reduce((p, c) => {
      return p.plus(c.num);
    }, new BigNumber(0))
    .toString();
  // console.log({ checkList });
  return {
    data,
    symbol: data?.symbol,
    logo: data?.gameLogo,
    totalNum,
    checkList,
    blockHeight: data?.blockHeight,
    ...props,
  };
}
