import moduleConf from '../conf';
import {
  useUserRenaissanceKit,
  useInviteFriends,
} from '@/hooks/useUserRenaissance';
import Button from './ui/button';
import SocalSVG from '@/utils/social';

export default function FriendsBoost () {
  const { inviteTgUser } = useUserRenaissanceKit();
  const { friends = [], friendsCnt = 0 } = useInviteFriends();
  return (
    <div className='p-4 space-y-3 border border-[#3f3b30] rounded-2xl'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base font-syne font-bold text-[#FFDFA2]'>
            {moduleConf.friends.title}
          </h2>
          <Button
            onClick={inviteTgUser}
            className='py-0.5 px-2 gap-x-1.5 text-xs'
          >
            {<SocalSVG.tg className='fill-white' />}
            {moduleConf.inviteBtn}
          </Button>
        </div>

        <h3 className='text-sm text-[#FFDFA2]/60'>
          Invite 1 friend = 500 TPoints + 3 scratch cards !
        </h3>
      </div>

      {friends.length > 0 && (
        <div className='flex items-center gap-x-1 text-sm text-[#F8C685]/60'>
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
