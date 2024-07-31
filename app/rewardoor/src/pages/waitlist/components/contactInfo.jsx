import { Form, Input, InputNumber } from 'antd';
import FormFrame from './formFrame';
import Button from '@/components/button';
import { useRef, useEffect, useState, useCallback } from 'react';

const timerOut = 60;
export default function BasicInfo (props) {
  const [form] = Form.useForm();
  const timeRef = useRef();
  const [timeCnt, setTimeCnt] = useState(0);
  const [emailSent, setEmailSent] = useState(
    props.valueRef.current.contactInfo?.emailCode
  );
  const handleSendEmail = e => {
    e.preventDefault();
    form
      .validateFields(['email'])
      .then(v => {
        // 获取email的code
        setEmailSent(true);
        setTimeCnt(timerOut);
        console.log('send email', v);
      })
      .catch(e => console.log(e));
  };
  const clear = useCallback(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  }, []);

  const handleNextStep = () => {
    form.validateFields().then(values => {
      props.valueRef.current.contactInfo = values;
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
        <Form.Item label='Email'>
          <div className='flex items-start w-full gap-x-2'>
            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'invalid email',
                },
                {
                  required: true,
                  message: 'email is required',
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
              disabled={timeCnt > 0}
            >
              Send a code
              {timeCnt > 0 && <span className='ms-1'>{timeCnt}s</span>}
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name='emailCode'
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
          name='number'
          label='Estimated Number of Participants in the Campaign'
        >
          <InputNumber placeholder='Enter a number' className='w-full' />
        </Form.Item>
        <Form.Item
          label='Application Reason'
          name='reason'
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
