import { memo } from 'react';
import clsx from 'clsx';

const Timeline = ({ steps = [] }) => {
  return (
    <ol role="list">
      {steps.map((step, stepIdx) => (
        <li
          key={step.name}
          className={clsx(
            stepIdx !== steps.length - 1 ? 'pb-2' : '',
            'relative'
          )}
        >
          {stepIdx !== steps.length - 1 ? (
            <div
              className={clsx(
                'absolute left-0 top-2.5  h-full w-px ',
                step.isFinished ? 'bg-white' : 'bg-[#6F6F6F]'
              )}
            />
          ) : null}
          <div className="absolute -left-1.5 top-0 flex items-center gap-x-1 text-sm">
            <span
              className={clsx(
                'size-3  rounded-full',
                step.isFinished ? 'bg-white' : 'bg-[#6F6F6F]'
              )}
            />
            <span className={step.isFinished ? 'text-white' : 'text-[#6F6F6F]'}>
              {step.name}
            </span>
          </div>
          <div className="pl-4 pt-6">{step.children}</div>
        </li>
      ))}
    </ol>
  );
};

export default memo(Timeline);
