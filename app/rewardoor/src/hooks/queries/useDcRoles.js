import { getDcRoles } from '@/api/incentive';
import { useQuery } from 'react-query';

export default function useDcRoles(serverLink) {
  const isUrlValidated = Boolean(
    serverLink && serverLink.startsWith('https://discord.gg/')
  );
  return useQuery(
    ['dcRoles', serverLink],
    async () => {
      try {
        const res = await getDcRoles(serverLink);
        if (res.code === 200) {
          return res.data.map((v) => ({ label: v.roleName, value: v.roleId }));
        } else {
          null;
        }
      } catch (error) {
        return null;
      }
    },
    {
      enabled: isUrlValidated,
      staleTime: 2000,
    }
  );
}
