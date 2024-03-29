import { useQuery } from 'react-query';
import { getTopProjects } from '@/api/incentive';

export default function useTopProjects() {
  return useQuery(['top-projects'], () => getTopProjects());
}
