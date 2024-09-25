import { useQuery, useQueryClient } from 'react-query';
import { getCompanyProjects } from '@/api/incentive';

export default function useCompanyProjects (companyId) {
  const queryClient = useQueryClient();
  return useQuery(
    [ 'company-projects', companyId ],
    () => getCompanyProjects(companyId),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      onSuccess: (data) => {
        queryClient.setQueryData([ 'company-projects', companyId ], data);
      },
    }
  );
}
