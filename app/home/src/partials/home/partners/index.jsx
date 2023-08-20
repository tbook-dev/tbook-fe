import { list1, list2 } from "./conf";

export default function Partners() {
  return (
    <div className="bx mb-10 lg:mb-[144px]">
      <div className="mb-8 text-center lg:mb-[50px]">
        <h2 className="text-c12 mb-0.5 lg:mb-3">
          <span className="font-medium text-colorful1">Partners</span>
        </h2>
        <h1 className="font-bold text-white text-c11 lg:text-cwh5">Be with builders </h1>
      </div>

      <div className="grid grid-cols-3 gap-y-5 gap-x-6 lg:grid-cols-4 lg:gap-x-[76px] lg:gap-y-10">
        {[...list1, ...list2].map((v) => (
          <img key={v.src} src={v.src} />
        ))}
      </div>
    </div>
  );
}
