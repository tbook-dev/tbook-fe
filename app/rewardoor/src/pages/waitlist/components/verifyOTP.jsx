import { OTPInput, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { cn } from '@/utils/conf';

function Slot (props) {
  return (
    <div
      className={cn(
        'relative h-14 text-[2rem]',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border rounded-lg border-white/10 bg-white/10',
        'group-hover:border-[#904BF6]/30 group-focus-within:border-[#904BF6]/30',
        'outline outline-0 outline-[#904BF6]/20',
        { 'outline-4 outline-[#904BF6]': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret () {
  return (
    <div className='absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink'>
      <div className='w-px h-8 bg-white' />
    </div>
  );
}

export default function VerifyOTP ({ value, onChange }) {
  return (
    <OTPInput
      maxLength={6}
      containerClassName='group grid grid-cols-6 gap-x-2 font-zen-dot has-[:disabled]:opacity-30'
      onChange={onChange}
      autoFocus
      value={value}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      render={({ slots }) =>
        slots.map((slot, idx) => <Slot key={idx} {...slot} />)
      }
    />
  );
}
