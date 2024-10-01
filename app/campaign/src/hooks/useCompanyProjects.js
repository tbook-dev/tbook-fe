import { useQuery } from 'react-query';
import { getCompanyProjects } from '@/api/incentive';

export default function useCompanyProjects (companyId, type) {
  return useQuery(
    [ 'company-projects', companyId, type ],
    () => getCompanyProjects(companyId, type),
    {
      enabled: !!companyId,
    }
  );
}
