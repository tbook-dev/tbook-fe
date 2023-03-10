import { useMemo } from "react";
import clsx from "clsx";
import { useResponsive } from "ahooks";

export default function () {
  const { pc } = useResponsive();
  const list = useMemo(
    () => [
      {
        icon: "",
        title: "Intelligent",
        desc: "By leveraging the numerous exemplary projects on our platform, we make astute recommendations for the solution that fits you best ",
      },
      {
        icon: "",

        title: "Security",
        desc: "By encrypting grant details, we ensures all sensitive information such as grant amounts and recipient details  are safeguarded against unauthorized access or tampering",
      },
      {
        icon: "",

        title: "Analytics",
        desc: "Experience the convenience of an all-in-one platform that provides efficient access to all grands details and reports on tokens",
      },
    ],
    []
  );

  return (
    <section className="grid bx  grid-cols-1 gap-y-4 rounded-lg  lg:grid-cols-3 lg:gap-x-12 mb-10 lg:mb-[192px]">
      {list.map((feat, idx) => {
        return (
          <div
            className={clsx(
              "flex flex-col px-5 py-3.5 lg:p-10 lg:rounded-2xl rounded-lg shadow-d6",
              !pc && idx % 2 !== 0 && "items-end text-right"
            )}
            key={feat.title}
          >
            <div className="w-24 h-24 lg:rounded-2xl shadow-d10 lg:mb-8">
              <img />
            </div>

            <h2 className="font-extrabold text-white lg:mb-2 lg:text-cwh2">{feat.title}</h2>
            <p className="tex-c6 text-c-9">{feat.desc}</p>
          </div>
        );
      })}
    </section>
  );
}
