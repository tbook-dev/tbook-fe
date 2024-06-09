import moduleConf from '../conf';

export default function Rewards () {
  return (
    <div>
      <h2>{moduleConf.rewards.title}</h2>
      <div className='text-xs grid grid-cols-4'>
        {moduleConf.rewards.list.map(v => {
          return (
            <div key={v.name}>
              <img src={v.picUrl} />
              <p>{v.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
