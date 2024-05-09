import bgPNG from './images/bg-apply.png';
import bgCenter from './images/bg-form.png';
import { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import InitalWaitList from './components/initalWaitList';
import BasicInfo from './components/bascInfo';
import ContactInfo from './components/contactInfo';
import AddtionInfo from './components/additionInfo';
import Submitted from './components/submitted';

const STEPENUM = {
  INIT: 0,
  FORM: 1,
  CONTACT: 2,
  ADDITION: 3,
  SUBMITTED: 4,
};
export default function WaitList () {
  const [step, setStep] = useState(STEPENUM.INIT);
  const [messageApi, contextHolder] = message.useMessage();

  const valueRef = useRef({});
  const handleJump = useCallback(
    v => () => {
      setStep(v);
    },
    []
  );
  const waitlistStep = {
    [STEPENUM.INIT]: (
      // <InitalWaitList handleNextStep={handleJump(STEPENUM.FORM)} />
      <InitalWaitList
        handleNextStep={() => messageApi.success('Stay tuned !')}
      />
    ),
    [STEPENUM.FORM]: (
      <BasicInfo
        valueRef={valueRef}
        handleBackStep={handleJump(STEPENUM.INIT)}
        handleNextStep={handleJump(STEPENUM.CONTACT)}
      />
    ),
    [STEPENUM.CONTACT]: (
      <ContactInfo
        valueRef={valueRef}
        handleBackStep={handleJump(STEPENUM.FORM)}
        handleNextStep={handleJump(STEPENUM.ADDITION)}
      />
    ),
    [STEPENUM.ADDITION]: (
      <AddtionInfo
        valueRef={valueRef}
        handleBackStep={handleJump(STEPENUM.CONTACT)}
        handleNextStep={handleJump(STEPENUM.SUBMITTED)}
      />
    ),
    [STEPENUM.SUBMITTED]: <Submitted />,
  };
  const CenterInfo = waitlistStep[step] || <div>todo</div>;

  return (
    <div
      style={{
        backgroundImage: `url(${step === STEPENUM.INIT ? bgPNG : bgCenter})`,
      }}
      className='flex-auto bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'
    >
      {contextHolder}
      <div className='w-[1280px] mx-auto'>{CenterInfo}</div>
    </div>
  );
}
