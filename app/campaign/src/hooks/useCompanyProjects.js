import { useQuery } from 'react-query';
import { getCompanyProjects } from '@/api/incentive';

export default function useCompanyProjects (companyName) {
  return useQuery([ 'company-projects' ], () => getCompanyProjects(companyName));
}
