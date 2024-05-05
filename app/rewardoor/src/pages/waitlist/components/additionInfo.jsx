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
export default function AddtionInfo(props) {
  const [form] = Form.useForm();
  return (
    <FormFrame {...props}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Which platform do you want for incentivizing your community? "
          name="platform"
        >
          <Checkbox.Group>
            <div className="flex flex-col gap-y-2">
              {platformList.map((v) => {
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
          name="additionalInfo"
          label="Do you have any additional info?"
        >
          <Input.TextArea
            autoSize={{ minRows: 3 }}
            placeholder="Any advice and information shared with TBook is welcomed."
          />
        </Form.Item>
      </Form>
    </FormFrame>
  );
}
