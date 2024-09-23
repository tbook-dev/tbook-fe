import { OTPInput, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { cn } from '@/utils/conf';
import { useState } from 'react';
import Button from './components/button';
import {
  useJoinMutation,
  useWiseCreditInviteFriends,
} from '@/hooks/useWiseScore';
import Backeds from '@/images/wise/backeds.svg';
import LazyImage from '@/components/lazyImage';
import { useNavigate } from 'react-router-dom';
import Nav from './components/nav';
import { ConfigProvider, message } from 'antd';

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
      inputMode="text"
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
  const navigate = useNavigate();
  const { refetch: refetchInviteCode } = useWiseCreditInviteFriends();

  const openMessage = (content, onClose) => {
    messageAPI.open({
      icon: null,
      content: (
        <div className="px-3 py-4 backdrop-blur-md rounded-xl">{content}</div>
      ),
      className: 'mt-10',
      onClose,
    });
  };
  const onComplete = async (val) => {
    const res = await mutation.mutateAsync({ code: val });
    if (res.success) {
      await refetchInviteCode();
      openMessage(`🌟🌟 ${res.message ?? 'sucess!'} 🌟🌟`, navToWiseInvite);
    } else {
      openMessage(res.message ?? 'unknown error!');
    }
  };

  const navToWiseInvite = () => {
    window.sessionRoutesCount -= 1;
    navigate('/wise-score/invite', { replace: true });
  };

  return (
    <div className="flex flex-col px-5 mt-3 pb-20 lg:px-0 max-w-md mx-auto gap-y-[160px]">
      <div className="space-y-4">
        <div className="space-y-2">
          <Nav to="/wise-score/invite">
            <h2 className="text-2xl font-medium">Invited by a friend?</h2>
          </Nav>

          <div className="text-sm text-white/60 font-thin">
            Enter your friend's code to grow his/her Credit!
          </div>
        </div>

        <div className="space-y-3">
          <VerifyOTP value={code} onChange={setCode} onComplete={onComplete} />
          <Button
            className="w-full h-10"
            disabled={code.length !== 6 || mutation.isLoading}
            isLoading={mutation.isLoading}
            onClick={() => onComplete(code)}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-base text-center text-[#999]">BACKED BY</h2>
        <LazyImage src={Backeds} className="h-6 aspect-[134/24] mx-auto" />
      </div>
      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: `rgba(255, 223, 162, 0.15)`,
              contentPadding: 0,
            },
          },
        }}
      >
        {messageContext}
      </ConfigProvider>
    </div>
  );
}
