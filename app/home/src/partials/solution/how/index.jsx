import { useResponsive } from "ahooks";

const conf = {
  title: "How TBOOK Works",
  list: ["Incentivize a project", "Created a incentive plan", "Grant!"],
};

export default function How() {
  const { pc } = useResponsive();

  return (
    <div className="relative px-4 lg:pt-40 lg:pb-[180px] lg:px-0 lg:bg-cw1">
      {pc && <div style={{ backgroundImage: "" }} />}
      <div className="py-5 px-[30px] rounded-lg lg:py-0 bx bg-cw1 lg:bg-none">
        <h2 className="mb-3 font-bold text-white lg:mb-10 lg:text-cwh9 text-ch1">{conf.title}</h2>
        <div className="space-y-2 lg:space-y-12">
          {conf.list.map((v, idx) => {
            return (
              <div className="flex items-center font-bold" key={v}>
                <span className="inline-block mr-5 text-white w-[25px] lg:w-[60px] lg:text-cwh9 text-ch1 lg:mr-10">
                  {idx + 1}
                </span>
                <span className="text-black lg:text-cwh10 text-c13">{v}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
