import emptyIcon from "@/images/icon/empty.svg";

export default function Empty({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 bg-white w-full rounded-xl">
      <img src={emptyIcon} alt="empty" className="h-12 mb-2.5" />
      <p className="text-base text-[#A1A1A2]">{text}</p>
    </div>
  );
}
