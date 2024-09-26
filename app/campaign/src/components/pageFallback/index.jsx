import Loading from '../loading';

export default function PageFallBack() {
  return (
    <div className="fixed inset-0 z-10 w-full bg-black">
      <div className="lg:w-[1200px] lg:mx-auto lg:absolute lg:top-0 lg:h-full lg:left-1/2 lg:-translate-x-1/2">
        <Loading className="absolute" text='Establishing playground....' />
      </div>
    </div>
  );
}
