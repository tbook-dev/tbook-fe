import ViewInPCSVG from '@/images/viewInPC.svg';

const moduleConf = {
  img: ViewInPCSVG,
  desc: 'Please visit the website in a web browser.',
};
export default function ViewInPC ({
  src = moduleConf.img,
  p = moduleConf.desc,
}) {
  return (
    <div className='flex flex-col gap-y-20 justify-center items-center'>
      <img src={src} className='w-[275px]' />
      <p className='text-center font-bold text-2xl mx-8'>{p}</p>
    </div>
  );
}
