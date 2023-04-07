import backIcon from "@tbook/share/images/icon/h5-back.svg";

export default function ({ backHandle, title, children }) {
  return (
    <div>
      <div className="flex items-center mb-8 dark:text-white">
        <img src={backIcon} className="w-7 h-7" onClick={backHandle} />
        <span className="ml-2 font-bold">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
