export default function Line ({ label, render }) {
  return (
    <div className='flex gap-x-4 items-start px-5 py-4'>
      <span className='w-[200px] text-[#A1A1A2] text-base font-medium'>
        {label}
      </span>
      <span className='w-[420px]'>{render}</span>
    </div>
  );
}
