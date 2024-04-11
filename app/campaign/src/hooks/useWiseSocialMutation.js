import { useMutation, useQueryClient } from 'react-query';
import { addWiseSocialLink } from '@/api/incentive';
export default function useWiseSocialMutation(messageApi) {
  const client = useQueryClient();

  return useMutation((data) => addWiseSocialLink(data), {
    onSuccess(data, variables, context) {
      client.invalidateQueries('wise-score');
    },
    onError: (error, variables, context) => {
      // An error happened!
      messageApi.error(error?.message);
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
  });
}
