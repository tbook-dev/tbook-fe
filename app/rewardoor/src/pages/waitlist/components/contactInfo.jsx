import { Form, Input, InputNumber, Space } from 'antd';
import FormFrame from './formFrame';
import Button from '@/components/button';
import { useRef, useEffect, useState, useCallback } from 'react';

export default function BasicInfo (props) {
  const [form] = Form.useForm();
  const timeRef = useRef();
  const [timeCnt, setTimeCnt] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const handleSendEmail = () => {
    setEmailSent(true);
    console.log('send email');
  };
  const clear = useCallback(() => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  }, []);
  useEffect(() => {
    if (timeCnt <= 0) {
      return;
    }
    timeRef.current = setInterval(setTimeCnt, 1000);
    return clear;
  }, [timeCnt]);
  return (
    <FormFrame {...props}>
      <Form form={form} layout='vertical'>
        <Form.Item label='Email'>
          <div className='flex items-start w-full gap-x-2'>
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'email is required',
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
              disabled={timeCnt > 0}
            >
              Send a code {timeCnt > 0 && <span>{timeCnt}</span>}
            </Button>
          </div>
        </Form.Item>
        {emailSent && (
          <Form.Item name='emailCode' label='Enter the Code'>
            <InputNumber placeholder='email code' className='w-full' />
          </Form.Item>
        )}
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
