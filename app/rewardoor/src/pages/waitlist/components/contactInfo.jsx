import { Form, Input, InputNumber } from 'antd';
import FormFrame from './formFrame';
import Button from '@/components/button';
import { useRef, useEffect, useState, useCallback } from 'react';
import { getEmailCode } from '@/api/incentive';

const timerOut = 60;
export default function BasicInfo ({ form, ...props }) {
  const timeRef = useRef();
  const [timeCnt, setTimeCnt] = useState(0);
  const [emailSent, setEmailSent] = useState(
    props.valueRef.current.contactInfo?.emailCode
  );
  const [isEmailLoading, setEmailLoading] = useState(false);
  const handleSendEmail = e => {
    e.preventDefault();
    form
      .validateFields(['email'])
      .then(v => {
        setEmailLoading(true);
        setEmailSent(true);
        // 获取email的code
        getEmailCode(v.email)
          .then(res => {
            if (res.success) {
              props.valueRef.current.key = res.entity.key;
              setTimeCnt(timerOut);
              setEmailSent(true);
            }
            console.log('send email', res, v.email);
          })
          .finally(() => {
            setEmailLoading(false);
          });
      })
      .catch(e => {
        console.log(e);
      });
  };
  const clear = useCallback(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  }, []);

  const handleNextStep = () => {
    form.validateFields().then(values => {
      props.valueRef.current = {
        ...props.valueRef.current,
        ...values,
      };
      // console.log({ values: props.valueRef.current });
      props.handleNextStep();
    });
  };

  useEffect(() => {
    if (timeCnt <= 0) {
      return;
    }
    timeRef.current = setTimeout(() => setTimeCnt(v => v - 1), 1000);
    return clear;
  }, [timeCnt]);

  return (
    <FormFrame {...props} handleNextStep={handleNextStep}>
      <Form
        form={form}
        layout='vertical'
        initialValues={props.valueRef.current.contactInfo}
      >
        <Form.Item label='Email' required>
          <div className='flex items-start w-full gap-x-2'>
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'email is required',
                },
                {
                  type: 'email',
                  message: 'invalid email',
                },
              ]}
              className='flex-auto'
            >
              <Input placeholder='Enter your email address' />
            </Form.Item>
            <Button
              type='primary'
              onClick={handleSendEmail}
              className='w-[200px]'
              disabled={timeCnt > 0 || isEmailLoading}
              loading={isEmailLoading}
            >
              Send a code
              {timeCnt > 0 && <span className='ms-1'>{timeCnt}s</span>}
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name='captcha'
          label='Enter the Code'
          rules={[
            {
              required: true,
              message: 'emailCode is required',
            },
          ]}
        >
          <InputNumber
            placeholder='email code'
            className='w-full'
            disabled={!emailSent}
          />
        </Form.Item>
        <Form.Item
          name='estimatedParticipants'
          label='Estimated Number of Participants in the Campaign'
        >
          <InputNumber placeholder='Enter a number' className='w-full' />
        </Form.Item>
        <Form.Item
          label='Application Reason'
          name='applyReason'
          rules={[{ required: true, message: 'Project TMA is required' }]}
        >
          <Input.TextArea
            autoSize={{
              minRows: 4,
            }}
            placeholder='Please briefly explain the reasons and expectations for applying for the trial of TBook Incentive'
          />
        </Form.Item>
      </Form>
    </FormFrame>
  );
}
