import { OTPInput, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { cn } from '@/utils/conf';
import { getQueryParameter, VITE_TBOOK_TG_CHANNEL, realTBook } from '@/utils/tma';
import { useState, useEffect } from 'react';
import Button from './components/button';
import { useJoinMutation, useWiseHasWiseScore } from '@/hooks/useWiseScore';
import Backeds from '@/images/wise/backeds.png';
import LazyImage from '@/components/lazyImage';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/loading';
import WebApp from '@twa-dev/sdk';
import { useQueryClient } from 'react-query';
const REGEXP_ONLY_DIGITS_AND_CHARS_REG = new RegExp(
  REGEXP_ONLY_DIGITS_AND_CHARS
);

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
  const { data: hasWiseScoreRes, refetch } = useWiseHasWiseScore();
  const queryClient = useQueryClient();
  useEffect(() => {
    const inviteCode = getQueryParameter(window.location.href, 'inviteCode');
    if (
      REGEXP_ONLY_DIGITS_AND_CHARS_REG.test(inviteCode) &&
      inviteCode?.length === 6 &&
      hasWiseScoreRes === false
    ) {
      setCode(inviteCode);
      // onComplete(inviteCode);
    }
  }, [hasWiseScoreRes]);
  const onComplete = async (val) => {
    const res = await mutation.mutateAsync({ code: val });
    if (res.success) {
      await refetch();
      queryClient.invalidateQueries('wise-score');
      navigate('/wise-score');
    } else {
      messageAPI.error(res.message ?? 'unknown error!');
    }
  };
  const handleTgClick = () => {
    WebApp.openTelegramLink(VITE_TBOOK_TG_CHANNEL);
  };
  const handleXClick = () => {
    WebApp.openLink(realTBook, { try_instant_view: true });
  };

  if (hasWiseScoreRes === undefined) {
    return <Loading text="Aggregating metrics..." />;
  } else if (hasWiseScoreRes === true) {
    navigate('/wise-score', { replace: true });
    window.sessionRoutesCount -= 1;
    return null;
  }
  return (
    hasWiseScoreRes === false && (
      <div className="flex flex-col px-5 mt-3 pb-20 lg:px-0 max-w-md mx-auto gap-y-[120px]">
        <div className="space-y-10">
          <h2 className="text-white text-2xl text-center font-thin">
            Generate WISE Credit Score
          </h2>
          <div className="space-y-3">
            <VerifyOTP
              value={code}
              onChange={setCode}
              onComplete={onComplete}
            />
            <Button
              className="w-full h-10"
              disabled={code.length !== 6 || mutation.isLoading}
              isLoading={mutation.isLoading}
              onClick={() => onComplete(code)}
            >
              Join Credit Network
            </Button>
            <div className="text-white/60 text-base font-thin">
              <p>
                Find an invitation code from your friends or , or in the TBook
                Community
              </p>
              <p>
                X
                <button
                  className="text-[#2D83EC] ms-1 underline underline-offset-2"
                  onClick={handleXClick}
                >
                  @realtbook
                </button>
              </p>
              <p>
                Telegram Channel
                <button
                  className="text-[#2D83EC] ms-1 underline underline-offset-2"
                  onClick={handleTgClick}
                >
                  @tbookincentive
                </button>
              </p>

              <p className='mt-6'>
                Leave a comment on X and we will randomly distribute invitation
                codes.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-base text-center">BACKED BY</h2>
          <LazyImage src={Backeds} className="h-6 aspect-[134/24] mx-auto" />
        </div>
        {messageContext}
      </div>
    )
  );
}
