import emptyUrl from "@tbook/share/images/icon/empty.svg";

export default function ({ description = "No grants", img = emptyUrl, ...props }) {
  return (
    <div className="h-[100px] flex flex-col items-center">
      <img src={emptyUrl} className="h-full" />
      <span className="text-xs font-medium dark:text-disable lg:text-sm">{description}</span>
    </div>
  );
}
