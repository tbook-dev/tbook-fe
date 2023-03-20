import conf from "./conf";

export default function () {
  return (
    <div className="px-4 bx lg:px-0 mb-10 lg:mb-[144px]">
      <h2 className="mb-3 font-extrabold text-center text-white lg:text-cwh9 text-cwh1 lg:mb-20">{conf.title} </h2>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6  lg:gap-x-[76px] lg:gap-y-10">
        {conf.list.map((v) => (
          <img key={v.src} src={v.src} />
        ))}
      </div>
    </div>
  );
}
