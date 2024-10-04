import { useQuery } from 'react-query';
import { getCompanyProjects } from '@/api/incentive';

export default function useCompanyProjects(companyId) {
  return useQuery(
    ['company-projects', companyId],
    () => getCompanyProjects(companyId),
    {
      enabled: !!companyId,
    }
  );
}
