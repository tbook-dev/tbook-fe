export default function ({ title, list = [] }) {
  return (
    <div className="bg-white divide-y rounded-md shadow-c5 lg:rounded-lg">
      {title && (
        <h2 className="text-[#333] px-4 py-1.5 text-[20px] leading-[24px] lg:py-3 lg:text-[24px] lg:leading-[32px]">
          {title}
        </h2>
      )}

      {list.map((v) => {
        return (
          <div key={v.label} className="flex px-4 py-3 text-[14px]">
            <span className="flex-[10] leading-[16px] text-[#666] lg:leading-[22px]">{v.label}</span>
            <span className="flex-[14] text-right lg:text-left leading-[18px] lg:leading-[20px]">{v.value}</span>
          </div>
        );
      })}
    </div>
  );
}
