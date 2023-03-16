import { Button } from "@tbook/ui";
import { conf } from "@tbook/utils";

import bgVideo from "./banner.mp4";
const { appLink } = conf;

export default function () {
  return (
    <div className="lg:h-[836px] overflow-hidden relative mb-10 lg:mb-0">
      <video className="relative inset-0 object-cover h-[210px] w-full lg:h-auto lg:absolute" loop autoPlay>
        <source src={bgVideo} type="video/mp4"></source>
      </video>
      <div className="flex justify-center ">
        <a target="_blank" href={appLink} className="relative mt-5 lg:mt-[605px]">
          <Button className="mx-auto px-8 cursor-pointer lg:bg-white lg:bg-none w-[80vw] lg:w-auto">Learn More</Button>
        </a>
      </div>
    </div>
  );
}
