import clsx from "clsx";

export default function Switch({ value, onChange, list }) {
  return (
    <div className="flex items-center text-[14px] leading-[16px] border p-1 border-[#d9d9d9] h-10 bg-white rounded-md">
      {list.map((v) => {
        return (
          <div
            className={clsx(
              "flex items-center justify-center h-8 rounded-md",
              value === v.value
                ? "bg-[#0049FF] text-[#fff] shadow-[1px_3px_8px_rgba(0, 0, 0, 0.3)]"
                : "text-[#999]"
            )}
            style={{ width: `${(1 / list.length) * 100}%` }}
            key={v.value}
            onClick={() => {
              if (!v.disabled) {
                onChange(v.value);
              }
            //   onChange(v.value);
            }}
          >
            {v.name}
          </div>
        );
      })}
    </div>
  );
}
