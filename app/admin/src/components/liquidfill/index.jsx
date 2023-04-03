import clsx from "clsx";

export default function Liquidfill({ percent = 30, size = 200, className = "" }) {
  return (
    <div
      className={clsx(
        "relative  p-1 overflow-hidden border-transparent bg-[#191919]  border-[5px] shadow-[0_0_0_5px_black,0_0_0_10px_#191919]",
        className
      )}
      style={{ width: size - 10, height: size - 10, margin: 10, borderRadius: "50%" }}
    >
      <div className="absolute z-0 w-full h-full bg-[#a0edff]" style={{ bottom: `calc(-128% + ${percent}%)` }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          viewBox="0 0 600 140"
          className="box-waves"
          fill="#a0edff"
        >
          <path d="M 0 70 Q 75 20,150 70 T 300 70 T 450 70 T 600 70 L 600 140 L 0 140 L 0 70Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          viewBox="0 0 600 140"
          className="box-waves"
          fill="#6AB3F7"
        >
          <path d="M 0 70 Q 75 20,150 70 T 300 70 T 450 70 T 600 70 L 600 140 L 0 140 L 0 70Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          viewBox="0 0 600 140"
          className="box-waves"
          fill="#2084cc"
        >
          <path d="M 0 70 Q 75 20,150 70 T 300 70 T 450 70 T 600 70 L 600 140 L 0 140 L 0 70Z"></path>
        </svg>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center text-4xl font-medium">{percent}%</div>
    </div>
  );
}
