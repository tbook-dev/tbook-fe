import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { getQueryParameter } from '@/utils/tma';
import { useState, useEffect } from 'react';
import { useJoinMutation, useWiseHasWiseScore } from '@/hooks/useWiseScore';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/loading';
import Generating from './generating';

const REGEXP_ONLY_DIGITS_AND_CHARS_REG = new RegExp(
  REGEXP_ONLY_DIGITS_AND_CHARS
);

export default function Join() {
  const mutation = useJoinMutation();
  const navigate = useNavigate();
  const { data: hasWiseScoreRes } = useWiseHasWiseScore();
  const [showGen, setShowGen] = useState(false);

  const navToWiseScore = () => {
    navigate('/wise-score', { replace: true });
    window.sessionRoutesCount -= 1;
  };

  const onComplete = async (code) => {
    const res = await mutation.mutateAsync({ code });
    if (res.success) {
      setShowGen(true);
    } else {
      navToWiseScore();
    }
  };
  useEffect(() => {
    const inviteCode = getQueryParameter(window.location.href, 'inviteCode');
    if (hasWiseScoreRes === false) {
      if (
        REGEXP_ONLY_DIGITS_AND_CHARS_REG.test(inviteCode) &&
        inviteCode?.length === 6
      ) {
        onComplete(inviteCode);
      }
    } else if (hasWiseScoreRes === true) {
      navToWiseScore();
    }
  }, [hasWiseScoreRes]);

  return showGen ? (
    <Generating hide={navToWiseScore} />
  ) : (
    <Loading text="Establishing playground...." />
  );
}
