import { Form, Input, Select } from 'antd';
import Alert from '@/components/alert';
import { condition } from '@tbook/credential/codition';
import { renderNoop } from './Defi';

const apiLink = '';
const FormItem = Form.Item;
export default {
  13: {
    render: ({ name }) => {
      return (
        <>
          <FormItem
            label="Title"
            name={[name, 'title']}
            rules={[
              {
                required: true,
                message: 'Please input the title',
              },
            ]}
          >
            <Input placeholder="Enter the aggregation Title, like Submit Exchange Address" />
          </FormItem>
          <FormItem label="Description" name={[name, 'description']}>
            <Input placeholder="Enter the description..." />
          </FormItem>
          <p className="text-sm font-medium text-c-9 mb-3">
            After users fill in their addresses, you can view the address list
            in the participant list.
          </p>
        </>
      );
    },
    pick: ['title', 'description'],
  },
  40: {
    render: ({ name }) => {
      return (
        <div>
          <Alert
            description={[
              `Please define what users need to do to complete the task. TBook will automatically call the provided API to verify whether users completed the task.`,
              <>
                For the CTA link and the task verification status, you need to
                send to TBook via API. Please refer to
                <a
                  className="text-[#B45309] hover:text-[#B45309] underline hover:underline mx-1"
                  target="_blank"
                  href={apiLink}
                >
                  the API standard.
                </a>
              </>,
            ].map((c, i) => (
              <p key={i}>{c}</p>
            ))}
          />
          <FormItem
            label="Credential Name"
            name={[name, 'credentialName']}
            rules={[
              {
                required: true,
                message: 'Please input the Credential Name',
              },
              {
                type: 'string',
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter the credential name which will be shown directly to users" />
          </FormItem>
          <FormItem
            label="CTA API link"
            name={[name, 'ctaApiLink']}
            rules={[
              {
                required: true,
                message: 'Please enter the Link',
              },
              {
                type: 'url',
                message: 'not a valid url',
              },
            ]}
          >
            <Input
              type="url"
              placeholder="Enter the CTA API link for users to complete the task"
            />
          </FormItem>
          <FormItem
            label="User Identity Users Must Provide Before verification"
            name={[name, 'condition']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select options={condition} />
          </FormItem>
          <FormItem
            label="Verification API Link"
            name={[name, 'verifyApiLink']}
            rules={[
              {
                required: true,
                message: 'Please enter the Link',
              },
              {
                type: 'url',
                message: 'not a valid url',
              },
            ]}
          >
            <Input
              type="url"
              placeholder="Enter the API link for verification"
            />
          </FormItem>
        </div>
      );
    },
    pick: ['credentialName', 'condition', 'ctaApiLink', 'verifyApiLink'],
    initialValues: {
      condition: 1,
    },
  },
  23: {
    render: renderNoop,
    pick: ['name'],
  },
  24: {
    render: renderNoop,
    pick: ['name'],
  },
  25: {
    render: renderNoop,
    pick: ['name'],
  },
  26: {
    render: renderNoop,
    pick: ['name'],
  },
  27: {
    render: renderNoop,
    pick: ['name'],
  },
  28: {
    render: renderNoop,
    pick: ['name'],
  },
  29: {
    render: renderNoop,
    pick: ['name'],
  },
  30: {
    render: renderNoop,
    pick: ['name'],
  },
  31: {
    render: renderNoop,
    pick: ['name'],
  },
  32: {
    render: renderNoop,
    pick: ['name'],
  },
  33: {
    render: renderNoop,
    pick: ['name'],
  },
  34: {
    render: renderNoop,
    pick: ['name'],
  },
  35: {
    render: renderNoop,
    pick: ['name'],
  },
  36: {
    render: renderNoop,
    pick: ['name'],
  },
  37: {
    render: renderNoop,
    pick: ['name'],
  },
  38: {
    render: renderNoop,
    pick: ['name'],
  },
  39: {
    render: renderNoop,
    pick: ['name'],
  },
  42: {
    render: renderNoop,
    pick: ['name'],
  },
  43: {
    render: renderNoop,
    pick: ['name'],
  },
  44: {
    render: renderNoop,
    pick: ['name'],
  },
  45: {
    render: renderNoop,
    pick: ['name'],
  },
  46: {
    render: renderNoop,
    pick: ['name'],
  },
  47: {
    render: renderNoop,
    pick: ['name'],
  },
  48: {
    render: renderNoop,
    pick: ['name'],
  },
  49: {
    render: renderNoop,
    pick: ['name'],
  },
  50: {
    render: renderNoop,
    pick: ['name'],
  },
  51: {
    render: renderNoop,
    pick: ['name'],
  },
  52: {
    render: renderNoop,
    pick: ['name'],
  },
  53: {
    render: renderNoop,
    pick: ['name'],
  },
};
