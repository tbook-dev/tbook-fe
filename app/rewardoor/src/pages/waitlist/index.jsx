import bgPNG from './images/bg-apply.png';
import bgCenter from './images/bg-form.png';
import { useState, useCallback, useRef } from 'react';
import InitalWaitList from './components/initalWaitList';
import BasicInfo from './components/bascInfo';
import ContactInfo from './components/contactInfo';
import AddtionInfo from './components/additionInfo';
import Submitted from './components/submitted';
import { projectApply } from '@/api/incentive';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { message, Form } from 'antd';

const STEPENUM = {
  INIT: 0,
  FORM: 1,
  CONTACT: 2,
  ADDITION: 3,
  SUBMITTED: 4,
};
const errorTip = 'Unknown error, please try again later.';
export default function WaitList () {
  const [formBasic] = Form.useForm();
  const [formContact] = Form.useForm();
  const [formAddition] = Form.useForm();

  const [step, setStep] = useState(STEPENUM.INIT);
  const { user } = useUserInfo();
  const valueRef = useRef({});
  const [applyLoading, setApplyLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleJump = useCallback(
    v => () => {
      setStep(v);
    },
    []
  );

  const handleSumbmit = async function () {
    setApplyLoading(true);
    try {
      const res = await projectApply({
        ...valueRef.current,
        userId: user?.userId,
      });
      setApplyLoading(false);
      if (res.success) {
        setStep(STEPENUM.SUBMITTED);
      } else {
        messageApi.error(res.message || errorTip);
      }
    } catch (error) {
      messageApi.error(errorTip);
    }
  };
  const waitlistStep = {
    [STEPENUM.INIT]: (
      <InitalWaitList handleNextStep={handleJump(STEPENUM.FORM)} />
    ),
    [STEPENUM.FORM]: (
      <BasicInfo
        form={formBasic}
        valueRef={valueRef}
        handleBackStep={handleJump(STEPENUM.INIT)}
        handleNextStep={handleJump(STEPENUM.CONTACT)}
      />
    ),
    [STEPENUM.CONTACT]: (
      <ContactInfo
        form={formContact}
        valueRef={valueRef}
        handleBackStep={handleJump(STEPENUM.FORM)}
        handleNextStep={handleJump(STEPENUM.ADDITION)}
      />
    ),
    [STEPENUM.ADDITION]: (
      <AddtionInfo
        form={formAddition}
        valueRef={valueRef}
        loading={applyLoading}
        handleBackStep={handleJump(STEPENUM.CONTACT)}
        handleNextStep={handleSumbmit}
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
