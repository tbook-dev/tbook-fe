import bgPNG from './images/bg-basicinfo.png';

export default function Verify () {
  return (
    <div
      style={{ backgroundImage: `url(${bgPNG})` }}
      className='flex-auto bg-no-repeat bg-cover bg-center'
    >
      <div className='w-[1280px] mx-auto'>111</div>
    </div>
  );
}
