import Nav from './components/nav';
import sbtPNG from '@/images/wise/rewards/sbt.png';

export default function SBT() {
  return (
    <div className="flex-auto w-full pb-10 space-y-6 px-5 mt-3 lg:px-0 mx-auto">
      <Nav title="WISE SBT" />

      <div className="flex flex-col items-center gap-y-3">
        <div className="relative">
          <img src={sbtPNG} className="size-[150px]" />
          <span className="bg-[#904BF6] px-1.5 py-px rounded-t-md rounded-br-md absolute top-0 right-[-70px]">
            Mint Open
          </span>
        </div>
        <div>
          <h4 className="text-xs text-white/60">Eligible to mint</h4>
          <h2 className="text-base font-medium">WISE SBT I</h2>
        </div>
      </div>

      <div>
        <h2>All WISE SBTs</h2>
      </div>
    </div>
  );
}
