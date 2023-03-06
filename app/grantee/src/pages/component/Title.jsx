import clsx from "clsx";

export default function ({ text, className, color="text-[#333]" }) {
  return (
    <h2
      className={clsx(
        "py-2 text-[20px] leading-[24px]",
        color,
        className
      )}
    >
      {text}
    </h2>
  );
}
