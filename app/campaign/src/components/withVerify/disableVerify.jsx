import { Tooltip } from 'antd';
import clsx from 'clsx';
const tip = 'The task has been verified by another incentive passport.';

export default function DisableVerify () {
  return (
    <Tooltip title={tip}>
      <span>
        <button
          // disabled
          className={clsx(
            'text-base whitespace-nowrap px-1.5 py-1 rounded',
            'flex items-center gap-x-1',
            'bg-[#382C48] text-[#8C8498] w-[78px]'
          )}
        >
          <svg
            width='16'
            height='17'
            viewBox='0 0 16 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.99961 15.1521C11.5342 15.1521 14.3996 12.2867 14.3996 8.75205C14.3996 5.21743 11.5342 2.35205 7.99961 2.35205C4.46499 2.35205 1.59961 5.21743 1.59961 8.75205C1.59961 12.2867 4.46499 15.1521 7.99961 15.1521ZM6.96529 6.58637C6.65288 6.27395 6.14634 6.27395 5.83392 6.58637C5.5215 6.89878 5.5215 7.40532 5.83392 7.71774L6.86824 8.75205L5.83392 9.78636C5.5215 10.0988 5.5215 10.6053 5.83392 10.9177C6.14634 11.2302 6.65288 11.2302 6.96529 10.9177L7.99961 9.88342L9.03392 10.9177C9.34634 11.2302 9.85287 11.2302 10.1653 10.9177C10.4777 10.6053 10.4777 10.0988 10.1653 9.78637L9.13098 8.75205L10.1653 7.71774C10.4777 7.40532 10.4777 6.89878 10.1653 6.58637C9.85287 6.27395 9.34634 6.27395 9.03392 6.58637L7.99961 7.62068L6.96529 6.58637Z'
              fill='#F87171'
            />
          </svg>
          Verify
        </button>
      </span>
    </Tooltip>
  );
}
