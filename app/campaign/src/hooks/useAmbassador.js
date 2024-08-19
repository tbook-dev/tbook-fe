import { useMutation, useQuery } from 'react-query';
import {
  applyAmbassador,
  getAmbassadorLevel,
  getAmbassadorLevels,
} from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';

export const ambassadorRequrements = [
  {
    name: 'WISE Credit Score',
    description: '>=150K',
    descriptionFull: 'WISE Credit Score >=150K',
    minValue: 150_000,
  },
  {
    name: 'TPoints',
    description: '>=10K',
    descriptionFull: 'TPoints >=10K',
    minValue: 10_000,
  },
];

export const useApplyAmbassadorMutation = () => {
  return useMutation((data) => applyAmbassador(data));
};

export const useAmbassadorLevel = () => {
  const { user } = useUserInfo();
  return useQuery('ambassadorLevel', () => getAmbassadorLevel(), {
    enabled: !!user?.userId,
  });
};

export const useAmbassadorLevels = () => {
  return useQuery('ambassadorLevel-list', () => getAmbassadorLevels(), {
    staleTime: Infinity,
  });
};
