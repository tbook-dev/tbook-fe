import moduleConf from '../conf';
import useUserRenaissance from '@/hooks/useUserRenaissance';

export default function Friends () {
  const { isLoading, data } = useUserRenaissance();
  const friends = data?.friends ?? [];
  return (
    <div className='p-4 space-y-2 border border-[#8541EE]/70 rounded-2xl'>
      <div>
        <h2 className='text-lg font-syne font-bold text-[#FFDFA2]'>
          {moduleConf.friends.title}
        </h2>
        <h3 className='text-sm text-[#FFDFA2]/60'>
          {moduleConf.friends.getSubtitle(friends.length)}
        </h3>
      </div>

      <div className='flex -space-x-1.5'>
        {friends.map(v => {
          return (
            <img
              src={v.avatar}
              key={v.userId}
              className='size-10 rounded-full object-cover object-center'
            />
          );
        })}
      </div>
    </div>
  );
}
