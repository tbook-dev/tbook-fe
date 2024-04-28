import bgPNG from './images/bg-apply.png';
import InitalWaitList from './components/initalWaitList';
import BasicInfo from './components/bascInfo';
import { useState } from 'react';

const waitlistStep = {
  init: 0,
  form: 1,
};
export default function WaitList () {
  const [step, setStep] = useState(waitlistStep.init);
  return (
    <div
      style={{ backgroundImage: `url(${bgPNG})` }}
      className='flex-auto bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'
    >
      <div className='w-[1280px] mx-auto'>
        {step === waitlistStep.init && (
          <InitalWaitList handleNextStep={() => setStep(waitlistStep.form)} />
        )}
        {step === waitlistStep.form && <BasicInfo />}
      </div>
    </div>
  );
}
