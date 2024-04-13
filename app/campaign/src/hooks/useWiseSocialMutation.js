import { useMutation, useQueryClient } from 'react-query';
import { addWiseSocialLink } from '@/api/incentive';
export default function useWiseSocialMutation(messageApi) {
  const client = useQueryClient();

  return useMutation((data) => addWiseSocialLink(data), {
    onSuccess(data) {
      if(data.code === 200){
        client.invalidateQueries('wise-score');
      }else{
        messageApi.error(data?.message);
      }
    },
    onError: (error) => {
      // An error happened!
      messageApi.error(error?.message);
    },
  });
}
