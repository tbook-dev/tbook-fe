import { OTPInput, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { cn } from '@/utils/conf';
import { getQueryParameter } from '@/utils/tma';
import { useState, useEffect } from 'react';
import Button from './button';
import { useJoinMutation, useWiseHasWiseScore } from '@/hooks/useWiseScore';
import Backeds from '@/images/wise/backeds.png';
import LazyImage from '@/components/lazyImage';
import { message } from 'antd';

function Slot(props) {
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

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

export function VerifyOTP({ value, onChange, onComplete }) {
  return (
    <OTPInput
      maxLength={6}
      containerClassName="group grid grid-cols-6 gap-x-2 font-zen-dot has-[:disabled]:opacity-30"
      onChange={onChange}
      onComplete={onComplete}
      autoFocus
      value={value}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      render={({ slots }) =>
        slots.map((slot, idx) => <Slot key={idx} {...slot} />)
      }
    />
  );
}

export default function Join() {
  const [code, setCode] = useState('');
  const mutation = useJoinMutation();
  const [messageAPI, messageContext] = message.useMessage();
  const { refetch } = useWiseHasWiseScore();
  useEffect(() => {
    const inviteCode = getQueryParameter(window.location.href, 'inviteCode');
    if (inviteCode) {
      setCode(inviteCode);
      onComplete(inviteCode);
    }
  }, []);
  const onComplete = async (val) => {
    const res = await mutation.mutateAsync({ code: val });
    if (!res.success) {
      await refetch();
    } else {
      messageAPI.error(res.message ?? 'unknown error!');
    }
  };
  return (
    <div className="space-y-10">
      <div className="space-y-2 text-center font-thin">
        <h2 className="text-white text-2xl">Generate WISE Credit Score</h2>
        <p className="text-white/60 text-base">
          Enter invitation code to join the most powerful credit network on TON
        </p>
      </div>
      <div className="space-y-3">
        <VerifyOTP value={code} onChange={setCode} onComplete={onComplete} />
        <Button
          className="w-full h-10"
          disabled={code.length !== 6 || mutation.isLoading}
          isLoading={mutation.isLoading}
          onClick={() => onComplete(code)}
        >
          Join Credit Network
        </Button>
      </div>
      <div className="space-y-6">
        <h2 className="text-base">BACKED BY</h2>
        <LazyImage src={Backeds} className="w-full aspect-[323/168]" />
      </div>
      {messageContext}
    </div>
  );
}
