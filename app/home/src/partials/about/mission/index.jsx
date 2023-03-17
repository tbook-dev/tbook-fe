import bgVideo from "./bg.mp4";
import { useResponsive } from "ahooks";
import clsx from "clsx";

export default function Mission() {
  const { pc } = useResponsive();

  return (
    <div className="text-black px-4 lg:px-0 lg:text-white lg:bg-cw1 mb-10 lg:mb-[240px] text-center lg:text-left ">
      <div className="relative flex flex-col justify-between p-10 mb-5 rounded-lg lg:flex-row lg:mb-0 shadow-d6 bx lg:rounded-none lg:shadow-none">
        <div className="lg:w-[341px] lg:pt-16 mb-3 lg:mb-0">
          <h3 className={clsx("mb-3 font-medium lg:text-black  text-c14 lg:text-c13", !pc && "text-colorful1")}>
            MISSION
          </h3>
          <h2 className="font-bold text-white lg:text-black text-ch1 lg:text-cwh6">About TBOOK Incentive Support</h2>
        </div>
        <div className="flex flex-col lg:py-[134px] lg:w-[520px]">
          <h2 className="hidden mb-3 text-cwh1 lg:text-black lg:block">Our Mission</h2>
          <p className="text-white lg:text-c-3 text-c8 lg:text-c13">
            Incentive is fundamental to Web3. The first Bitcoin was created to incentivize miners to solve the hash
            puzzle through a coinbase transaction, and the same approach was taken with the first Ethereum.
            <br />
            <br />
            Free the ownership, incentivize the innovation.
          </p>
        </div>
        <div className="hidden lg:block absolute w-[628px] h-[360px] left-0 -bottom-[120px]">
          <video className="object-cover w-full h-full rounded-2xl" preload="auto" playsInline muted loop autoPlay>
            <source src={bgVideo} type="video/mp4"></source>
          </video>
        </div>
      </div>

      <video
        className="block object-cover w-full h-[197px] rounded-lg lg:hidden"
        preload="auto"
        playsInline
        muted
        loop
        autoPlay
      >
        <source src={bgVideo} type="video/mp4"></source>
      </video>
    </div>
  );
}
