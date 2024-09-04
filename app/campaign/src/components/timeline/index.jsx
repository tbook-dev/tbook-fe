import { memo } from 'react';
import { cn } from '@/utils/conf';

const Timeline = ({ steps = [], showProcess = false }) => {
  return (
    <ol role="list" className="space-y-2">
      {steps.map((step, stepIdx) => {
        const isLast = stepIdx === steps.length - 1;
        const showLine = showProcess && steps.length > 1;
        return (
          <li
            key={stepIdx}
            className={cn(
              stepIdx !== steps.length - 1 ? 'pb-2' : '',
              'relative'
            )}
          >
            {showLine && !isLast && (
              <div
                className={cn(
                  'absolute left-0 top-3  h-full w-px ',
                  step.isFinished ? 'bg-white' : 'bg-[#6F6F6F]'
                )}
              />
            )}
            {showLine && (
              <div className="absolute -left-1.5 top-0 flex items-center gap-x-1 text-sm">
                <span
                  className={cn(
                    'size-3  rounded-full',
                    step.isFinished || stepIdx === 0
                      ? 'bg-white'
                      : 'bg-[#6F6F6F]'
                  )}
                />
                <span
                  className={
                    step.isFinished || stepIdx === 0
                      ? 'text-white'
                      : 'text-[#6F6F6F]'
                  }
                >
                  {step.name}
                </span>
              </div>
            )}

            <div className={cn(showLine && 'pl-4 pt-6')}>{step.children}</div>
          </li>
        );
      })}
    </ol>
  );
};

export default memo(Timeline);
