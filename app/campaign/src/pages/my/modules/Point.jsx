import { formatDollar } from "@tbook/utils/lib/conf";
const data = {
  total: 3000,
  list: [
    {
      num: 3,
      date: "date",
    },
    {
      num: 4,
      date: "date",
    },
  ],
};
export default function Point() {
  return (
    <div className="space-y-2">
      <div className="flex flex-col items-center justify-center text-black bg-white rounded-xl h-[124px]">
        <div className="font-bold text-4.2xl leading-[44px] mb-1">
          {formatDollar(data.total)}
        </div>
        <div className="font-medium text-base">points</div>
      </div>
      {data.list.map((v) => {
        return (
          <div className="flex items-center justify-between py-3 px-5 bg-white rounded-xl">
            <span>{formatDollar(v.num)}</span>
            <span>{v.date}</span>
          </div>
        );
      })}
    </div>
  );
}
