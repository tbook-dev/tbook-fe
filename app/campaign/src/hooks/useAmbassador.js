import { useMutation } from 'react-query';
import { applyAmbassador } from '@/api/incentive';

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
