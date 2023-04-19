import { conf } from "@tbook/utils";

const { appLink } = conf;

const title = "Buidl with TBOOK";
const paragraph = `Dive Into Incentive Protocol With Us`;
const caLink = "https://calendly.com/keylasue/30min";

export default function Da() {
  const handleClick = () => {
    Calendly?.initPopupWidget({ url: caLink });
  };
  return (
    <div className="p-3 mb-10 lg:mb-[144px] rounded-lg lg:p-10 lg:rounded-2xl shadow-d6 bx">
      <div className="mb-5 text-center lg:mb-10">
        <h2 className="mb-0.5 lg:text-c3 lg:mb-3 text-sm font-medium">
          <span className="text-colorful1">{title}</span>
        </h2>
        <p className="font-bold text-white lg:text-cwh6 text-ch1">{paragraph}</p>
      </div>

      <div className="flex flex-col items-center font-medium lg:flex-row lg:justify-center text-c9 lg:space-x-6">
        <a href={appLink} target="_blank" className="mb-4 lg:mb-0">
          <button className="h-10 w-[60vw] lg:w-[140px] shadow-d5 text-white bg-black rounded-md hover:opacity-70">
            Try App Now
          </button>
        </a>

        <button
          onClick={handleClick}
          className="h-10 w-[60vw] lg:w-[140px] text-black rounded-md bg-cw1 hover:opacity-70"
        >
          Set Up A Call
        </button>
      </div>
    </div>
  );
}
