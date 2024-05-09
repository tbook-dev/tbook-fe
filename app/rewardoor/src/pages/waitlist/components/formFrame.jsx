import Button from '@/components/button';

const moduleConf = {
  title: ['Join waitlist for', 'the TBook Incentive Layer'],
};
export default function FormFrame ({
  backText = 'Previous',
  handleBackStep = null,
  backDisable = false,
  nextText = 'Next',
  handleNextStep = null,
  nextDisable = false,
  children,
}) {
  return (
    <div className='w-[632px] h-[760px] mx-auto my-6 p-20 rounded-[32px] bg-black/20 drop-shadow border border-white/20 flex flex-col justify-between gap-y-10'>
      <div className='space-y-16'>
        <h2 className='text-4xl w-[460px] mb-10 text-center'>
          {moduleConf.title[0]}
          <br />
          <span className='ms-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#7E6CA5] to-80%'>
            {moduleConf.title[1]}
          </span>
        </h2>
        <div>{children}</div>
      </div>

      <footer className='flex justify-between items-center'>
        <Button onClick={handleBackStep} disabled={backDisable} type='gost'>
          {backText}
        </Button>
        <Button type='primary' onClick={handleNextStep} disabled={nextDisable}>
          {nextText}
        </Button>
      </footer>
    </div>
  );
}
