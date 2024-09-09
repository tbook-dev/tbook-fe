import { cn } from '@/utils/conf';
import Button from '../components/button';

export default function Frame({
  className,
  onClick,
  children,
  header,
  footer,
  button,
  style,
}) {
  return (
    <div
      className={cn(
        'relative px-4 flex flex-col items-center justify-center h-screen min-h-[570px]',
        'bg-cover bg-center font-bold',
        className
      )}
      style={style}
    >
      {header && (
        <h2 className="text-xl w-full absolute top-20 left-0 text-center">
          {header}
        </h2>
      )}

      {children}
      <div className="absolute inset-x-0 bottom-10 w-[310px] mx-auto">
        <div className="text-center text-sm mb-5">{footer}</div>
        {button ? (
          button
        ) : (
          <Button className="h-10 w-full mx-auto font-bold" onClick={onClick}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
