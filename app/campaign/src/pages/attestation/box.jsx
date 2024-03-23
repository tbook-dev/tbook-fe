export default function Box ({ title, wrapCls, children }) {
  return (
    <div className='rounded-2xl bg-[#121212]'>
      <h2 className='text-[#F0F0F0] text-lg font-medium px-5 py-4 border-b border-[#2A2A2A]'>
        {title}
      </h2>
      <div className={wrapCls}>{children}</div>
    </div>
  );
}
