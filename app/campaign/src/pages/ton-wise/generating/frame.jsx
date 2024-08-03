import { cn } from '@/utils/conf';
import Button from '../components/button';

export default function Frame({ onClick, children, header, footer, button }) {
  return (
    <div
      className={cn(
        'relative px-4 h-full pt-20 pb-36 flex flex-col items-center justify-center min-h-[570px]'
      )}
    >
      <h2 className="text-xl w-full absolute top-10 left-0 text-center">
        {header}
      </h2>
      {children}
      <div className="absolute inset-x-0 bottom-10 w-[310px] mx-auto">
        <div className="text-center text-sm mb-5">{footer}</div>
        {button ? (
          button
        ) : (
          <Button className="h-10 w-full mx-auto font-syne" onClick={onClick}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
