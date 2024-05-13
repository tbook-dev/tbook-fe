import { Form, Input, Checkbox } from 'antd';
import FormFrame from './formFrame';

const platformList = [
  'Twitter',
  'Discord',
  'Telegram',
  'LinkedIn',
  'Facebook',
  'Snapshot',
  'Reddit',
  'YouTube',
];
export default function AddtionInfo ({ form, ...props }) {
  const handleNextStep = () => {
    form.validateFields().then(values => {
      props.valueRef.current = {
        ...props.valueRef.current,
        ...values,
        socialPlatforms: values.socialPlatforms.join(','),
      };
      props.handleNextStep();
    });
  };
  return (
    <FormFrame {...props} handleNextStep={handleNextStep}>
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Which platform do you want for incentivizing your community? '
          name='socialPlatforms'
        >
          <Checkbox.Group>
            <div className='flex flex-col gap-y-2'>
              {platformList.map(v => {
                return (
                  <Checkbox key={v} value={v}>
                    {v}
                  </Checkbox>
                );
              })}
            </div>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name='additionalSocialInfo'
          label='Do you have any additional info?'
        >
          <Input.TextArea
            autoSize={{ minRows: 3 }}
            placeholder='Any advice and information shared with TBook is welcomed.'
          />
        </Form.Item>
      </Form>
    </FormFrame>
  );
}
