import Footer from "@/layout/common/Footer";
import { useResponsive } from "ahooks";
import bgPc from "@/images/error/404-pc.svg";
import bg from "@/images/error/404.svg";

const moduleConf = {
  title1: "404",
  title2: "Page Not Found",
  desc: `The page you are looking for doesn’t exists or have been removed.`,
};
export default function Global404() {
  const { pc } = useResponsive();

  return (
    <div className="flex flex-col  min-h-screen bg-black text-white">
      <div
        className="relative flex-auto overflow-x-hidden overflow-y-auto flex pb-20"
        style={
          pc
            ? null
            : {
                backgroundImage: `url(${bg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
        }
      >
        {pc && (
          <img src={bgPc} className="absolute w-full h-full object-cover" />
        )}
        <div className="relative px-6 lg:px-0 lg:w-[1200px] mx-auto flex flex-col justify-end pb-10 lg:pb-0 lg:justify-center items-center lg:items-start gap-y-8 lg:gap-y-16">
          <div className="space-y-4 lg:space-y-7 text-center lg:text-start">
            <h2 className="text-3xl font-medium lg:text-6xl lg:font-semibold">
              {moduleConf.title1}
              <br />
              {moduleConf.title2}
            </h2>
            <p className="text-lg lg:text-2xl lg:w-[460px]">{moduleConf.desc}</p>
          </div>
        </div>
      </div>
        
      <div className="fixed bottom-0 inset-x-0">
        <Footer />
      </div>
    </div>
  );
}
