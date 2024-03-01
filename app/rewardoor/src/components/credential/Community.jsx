import { Form, Input } from 'antd';
const FormItem = Form.Item;

export default {
  // twitter
  11: ({ name }) => {
    return (
      <FormItem
        label="Tweet Link"
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder="Paste tweet link here!" />
      </FormItem>
    );
  },
  1: ({ name }) => {
    return (
      <FormItem
        label="Tweet Link"
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder="Paste tweet link here!" />
      </FormItem>
    );
  },
  2: ({ name }) => {
    return (
      <FormItem
        label="Tweet Link"
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder="Paste tweet link here!" />
      </FormItem>
    );
  },
  3: ({ name }) => {
    return (
      <FormItem
        label="Tweet Space Link"
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder="Paste twitter space link here!" />
      </FormItem>
    );
  },

  // discord
  4: ({ name }) => {
    return (
      <FormItem
        label="Discord Server URL"
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input the Discord Server URL',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder="https://discord.gg/xxxx!" />
      </FormItem>
    );
  },
  5: ({ name }) => {
    return (
      <div className="space-y-3">
        <div className="text-sm font-medium text-c-9">
          <a
            className="underline text-[#1D9BF0]"
            href="https://app.gitbook.com/o/XmLEuzCUK0IIbhY5X44k/s/xLOTfURQ4EC9jmYQjFob/how-to-get-role-id-in-discord"
            target="_blank"
          >
            How to get Role ID in Discord
          </a>
        </div>
        <FormItem
          label="Discord Server URL"
          name={[name, 'link']}
          rules={[
            {
              required: true,
              message: 'Please input the Verify Discord Role',
            },
            {
              required: false,
              message: 'Please input a valid url',
              type: 'url',
            },
          ]}
        >
          <Input placeholder="https://discord.gg/xxxx!" />
        </FormItem>
        <FormItem
          label="Role ID"
          name={[name, 'roleId']}
          rules={[
            {
              required: true,
              message: 'Please input the Role ID',
            },
          ]}
        >
          <Input placeholder="Enter Role ID" />
        </FormItem>
        <FormItem
          label="Role Name"
          name={[name, 'roleName']}
          rules={[
            {
              required: true,
              message: 'Please input the Role Name',
            },
          ]}
        >
          <Input placeholder="Enter Role Name" />
        </FormItem>
      </div>
    );
  },
  // tg
  6: ({ name }) => {
    return (
      <div className="space-y-3">
        <div className="text-sm font-medium text-c-9">
          <p>Add TBOOK support bot as an admin to your group</p>
          <a
            href="https://t.me/tbook_sign_bot"
            className="underline text-[#1D9BF0]"
            target="_blank"
          >
            Invite bot
          </a>
        </div>
        <FormItem
          label="Group Invite Link"
          name={[name, 'link']}
          rules={[
            {
              required: true,
              message: 'Please input the invite link',
            },
            {
              required: false,
              message: 'Please input a valid url',
              type: 'url',
            },
          ]}
        >
          <Input placeholder="Please paste the invite link to your telegram group" />
        </FormItem>
      </div>
    );
  },
  7: ({ name }) => {
    return (
      <div className="space-y-3">
        <div className="text-sm font-medium text-c-9">
          <p>Add TBOOK support bot as an admin to your channel</p>
          <a
            href="https://t.me/tbook_sign_bot"
            className="underline text-[#1D9BF0]"
            target="_blank"
          >
            Invite bot
          </a>
        </div>
        <FormItem
          label="Channel Invite Link"
          name={[name, 'link']}
          rules={[
            {
              required: true,
              message: 'Please input the invite link',
            },
            {
              required: false,
              message: 'Please input a valid url',
              type: 'url',
            },
          ]}
        >
          <Input placeholder="Please paste the invite link to your telegram channel" />
        </FormItem>
      </div>
    );
  },
};
