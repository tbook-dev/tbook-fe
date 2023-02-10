import clsx from "clsx";

export default function ({ text, className }) {
  return (
    <h2
      className={clsx(
        "py-2 text-[20px] leading-[24px] text-[#333]",
        className
      )}
    >
      {text}
    </h2>
  );
}
