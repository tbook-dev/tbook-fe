import moduleConf from '../conf';

export default function Rewards () {
  return (
    <div className='p-4 space-y-2 border border-[#FFEAB5]/30 rounded-2xl'>
      <h2 className='text-base font-syne font-bold text-[#FFDFA2]'>
        {moduleConf.rewards.title}
      </h2>
      <div className='text-xs grid grid-cols-4'>
        {moduleConf.rewards.list.map(v => {
          return (
            <div key={v.name} className='flex flex-col items-center gap-y-3'>
              <img src={v.picUrl} className='size-12' />
              <p className='text-[#FFDFA2]/60'>{v.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
