import logoOkSVG from '@/images/icon/logo-ok.svg';

const moduleConf = {
  title: 'Congratulations',
  desc: [
    `You’re now part of the TBook waitlist. `,
    'We will send you an email for the result as soon as possible.',
  ],
};
export default function Submitted () {
  return (
    <div className='w-[632px] h-[740px] mx-auto my-6 p-20 rounded-[32px] bg-black/20 drop-shadow border border-white/20 flex flex-col items-center justify-center gap-y-4'>
      <img src={logoOkSVG} className='size-14' />
      <h2 className='font-medium text-3xl'>
        <span className='text-transparent bg-gradient-to-r bg-clip-text from-white to-[#7E6CA5] to-70%'>
          {moduleConf.title}{' '}
        </span>
        🚀
      </h2>
      <div className='text-base text-[rgb(225,205,255)]/70 text-center'>
        {moduleConf.desc.map((v, idx) => (
          <p key={idx}>{v}</p>
        ))}
      </div>
    </div>
  );
}
