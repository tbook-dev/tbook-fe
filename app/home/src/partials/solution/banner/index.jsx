import banner from "./banner.png";
import { useResponsive } from "ahooks";
import { Button } from "@tbook/ui";

import { conf } from "@tbook/utils";
const { appLink } = conf;
const list = [
  {
    title: "Trusted Brands",
    val: "20+",
  },
  {
    title: "TBOOK Users",
    val: "10,000+",
  },
  {
    title: "Served Projects",
    val: "50+",
  },
];

export default function Banner() {
  const { pc } = useResponsive();

  return (
    <div className="relative">
      {pc && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0 bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}

      <div className="lg:h-[836px] flex items-center bx relative pt-[45px] lg:pt-0">
        <div className="px-4 text-center lg:px-0 lg:text-left">
          <h2 className="font-extrabold text-white px-5 lg:px-0 text-c11 lg:text-cwh7 lg:w-[1002px] mb-3 lg:mb-4">
            Superincentive Your Web3 <span className="text-colorful1 ">deverlopers</span>
          </h2>
          <p className="mb-12 lg:mb-4 text-c4 lg:text-c9 text-c-9">
            The Smart and Secure Way to Create and <br /> Manage Token Incentive Plans
          </p>
          <div className="flex justify-center mt-10 lg:block lg:mt-0">
            <a target="_blank" href={appLink} className="relative">
              <Button className="mx-auto px-8 cursor-pointer lg:bg-white lg:bg-none w-[80vw] lg:w-auto">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-between px-0 py-4 space-y-5 text-center lg:flex-row lg:px-16 lg:py-8 lg:space-x-0 lg:text-left bx">
        {list.map((v) => (
          <div key={v.title}>
            <p className="mb-1 font-bold text-white lg:mb-px text-cwh8 lg:text-cwh7">{v.val}</p>
            <p className="font-medium lg:text-c15 text-c4 text-c-9">{v.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
