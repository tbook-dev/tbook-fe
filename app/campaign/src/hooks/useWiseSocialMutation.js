import { useMutation, useQueryClient } from 'react-query';
import { addWiseSocialLink } from '@/api/incentive';
export default function useWiseSocialMutation(messageApi) {
  const client = useQueryClient();

  return useMutation((data) => addWiseSocialLink(data), {
    onSuccess(data) {
      client.invalidateQueries('wise-score');
    },
    onError: (error) => {
      // An error happened!
      messageApi.error(error?.message);
    },
  });
}
