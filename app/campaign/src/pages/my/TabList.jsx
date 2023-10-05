import clsx from "clsx";

export default function TabList({ disabled, tabs, value, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-x-6 text-sm font-medium text-[#717374]">
      {tabs.map((m) => {
        return (
          <button
            key={m.name}
            disabled={disabled}
            className={clsx(
              m.value === value && "text-black font-bold border-b-[2px]",
              "hover:opacity-80 pb-2 border-black min-w-[70px]"
            )}
            onClick={() => {
              onSelect(m.value);
            }}
          >
            {m.name}
          </button>
        );
      })}
    </div>
  );
}
