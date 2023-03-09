import Typed from "@/components/Type";
import banner from "@/images/banner-01.png";
import { Button } from "@tbook/ui";
import { conf } from "@tbook/utils";

const { appLink, myLink } = conf;

export default function () {
  return (
    <section className="relative mt-[44px] lg:mt-[126px] lg:h-[600px] lg:mb-[92px] mb-10">
      <div className="bx">
        <div className="w-[240px] lg:w-[427px] mb-2 lg:mb-6 mx-auto lg:ml-0">
          <div className="lg:pt-[126px] lg:mb-4">
            <div className="h-[80px] lg:h-[150px]">
              <h2 className="font-bold text-white break-all text-cwh1 lg:text-cwh4 ">
                <Typed strings={[`<span class="text-colorful1">Token Incentive</span> Made Easy`]} />
              </h2>
            </div>
          </div>
        </div>

        <div className="w-[270px] lg:w-[427px] mb-8 mx-auto lg:ml-0">
          <p className="text-c2 lg:text-c3 text-c-9">
            The Smart and Secure Way to Create and Manage Token Incentive Plans
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8 lg:mb-0 lg:block">
          <a href={appLink} target="_blank" className="mb-4 lg:mb-0">
            <Button className="px-8 cursor-pointer lg:bg-white lg:bg-none w-[80vw] lg:w-auto lg:mr-[22px]">
              Launch APP
            </Button>
          </a>

          <a href={myLink} target="_blank">
            <Button className="px-8 cursor-pointer dark:bg-black dark:text-white w-[80vw] lg:w-auto bg-none dark:shadow-d3">
              My Grants
            </Button>
          </a>
        </div>
      </div>
      <div className="-mr-4">
        <img src={banner} className="relative -mr-4 lg:absolute lg:top-0 lg:right-0 lg:h-[600px]" />
      </div>
    </section>
  );
}
