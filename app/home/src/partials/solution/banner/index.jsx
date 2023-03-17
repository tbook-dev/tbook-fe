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
          className="absolute left-0 top-0 w-full h-[907px]  bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}

      <div className="lg:h-[836px] flex items-center bx relative">
        <div>
          <h2 className="font-extrabold text-white text-cwh7">Superincentive Your Web3</h2>
          <h2 className="font-extrabold text-colorful1 text-cwh7 lg:mb-16">deverlopers</h2>
          <p className="lg:mb-4 text-c9 text-c-9">
            The Smart and Secure Way to Create and <br /> Manage Token Incentive Plans
          </p>
          <a target="_blank" href={appLink} className="relative mt-5 lg:mt-[605px]">
            <Button className="mx-auto px-8 cursor-pointer lg:bg-white lg:bg-none w-[80vw] lg:w-auto">
              Get Started
            </Button>
          </a>
        </div>
      </div>
      <div className="relative flex justify-between bx">
        {list.map((v) => (
          <div key={v.title}>
            <p className="mb-1 font-medium lg:font-bold lg:mb-px text-c15 lg:text-cwh7">{v.val}</p>
            <p className="font-medium lg:text-c6 text-c4 text-c-6">{v.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
