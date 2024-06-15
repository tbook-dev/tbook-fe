import moduleConf from '../conf';
import { useUserRenaissanceKit } from '@/hooks/useUserRenaissance';

export default function Friends () {
  const { friends, friendsCnt } = useUserRenaissanceKit();
  return (
    <div className='p-4 space-y-3 border border-[#3f3b30] rounded-2xl'>
      <h3 className='text-sm text-[#FFDFA2]/60 flex items-center justify-center'>
        Invite 1 friend to earn 500
        <img src={moduleConf.url.tpoint} className='size-3 mx-1' />+ 3
        <img src={moduleConf.url.cat} className='w-5 ml-1 -mt-1' />
      </h3>

      {friends.length > 0 && (
        <div className='flex items-center justify-center gap-x-2 text-sm text-[#F8C685]/60'>
          <div className='flex -space-x-1.5'>
            {friends.map((v, i) => {
              return (
                <img
                  src={v.avatar}
                  key={i}
                  className='size-5 rounded-full object-cover object-center'
                />
              );
            })}
          </div>
          {moduleConf.friends.getSubtitle(friendsCnt)}
        </div>
      )}
    </div>
  );
}
