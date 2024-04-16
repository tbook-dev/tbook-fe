import { Form, Input } from 'antd';
import dcInviteImg from '@/images/dc-invite.png';
import Invitebot from '../components/invitebot';
const FormItem = Form.Item;

const dcBotLink =
  'https://discord.com/oauth2/authorize?client_id=1146414186566537288&permissions=2417034321&scope=bot';

export default {
  // twitter
  11: {
    render: ({ name }) => {
      return (
        <FormItem
          label='Tweet Link'
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
          <Input placeholder='Paste tweet link here!' />
        </FormItem>
      );
    },
    pick: ['link'],
  },
  1: {
    render: ({ name }) => {
      return (
        <FormItem
          label='Tweet Link'
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
          <Input placeholder='Paste tweet link here!' />
        </FormItem>
      );
    },
    pick: ['link'],
  },
  2: {
    render: ({ name }) => {
      return (
        <FormItem
          label='Tweet Link'
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
          <Input placeholder='Paste tweet link here!' />
        </FormItem>
      );
    },
    pick: ['link'],
  },
  3: {
    render: ({ name }) => {
      return (
        <FormItem
          label='Tweet Space Link'
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
          <Input placeholder='Paste twitter space link here!' />
        </FormItem>
      );
    },
    pick: ['link'],
  },

  // discord
  4: {
    render: ({ name }) => {
      return (
        <div className='space-y-3'>
          <Invitebot
            botLink={dcBotLink}
            inviteHelpLink='https://app.gitbook.com/o/XmLEuzCUK0IIbhY5X44k/s/xLOTfURQ4EC9jmYQjFob/how-to-get-role-id-in-discord'
          />

          <FormItem
            label='Server Invite Link'
            tooltip={{
              title: (
                <div className='rounded-2.5xl p-4 relative space-y-2'>
                  <p className='text-sm font-medium'>
                    It has to be a never expire and no max number of users
                    limitation invite link.
                  </p>
                  <img src={dcInviteImg} alt='dc bot invite img' />
                </div>
              ),
              overlayInnerStyle: {
                width: 400,
              },
            }}
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
            <Input placeholder='https://discord.gg/xxxx!' />
          </FormItem>
        </div>
      );
    },
    pick: ['link'],
  },
  5: {
    render: ({ name }) => {
      return (
        <div className='space-y-3'>
          <Invitebot
            botLink={dcBotLink}
            inviteHelpLink='https://app.gitbook.com/o/XmLEuzCUK0IIbhY5X44k/s/xLOTfURQ4EC9jmYQjFob/how-to-get-role-id-in-discord'
          />

          <FormItem
            label='Server Invite Link'
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
            <Input placeholder='https://discord.gg/xxxx!' />
          </FormItem>
          <FormItem
            label='Role ID'
            name={[name, 'roleId']}
            rules={[
              {
                required: true,
                message: 'Please input the Role ID',
              },
            ]}
          >
            <Input placeholder='Enter Role ID' />
          </FormItem>
          <FormItem
            label='Role Name'
            name={[name, 'roleName']}
            rules={[
              {
                required: true,
                message: 'Please input the Role Name',
              },
            ]}
          >
            <Input placeholder='Enter Role Name' />
          </FormItem>
        </div>
      );
    },

    pick: ['link', 'roleId', 'roleName'],
  },
  // tg
  6: {
    render: ({ name }) => {
      return (
        <div className='space-y-3'>
          <div className='text-sm font-medium text-c-9'>
            <p>Add TBOOK support bot as an admin to your group</p>
            <a
              href='https://t.me/tbook_sign_bot'
              className='underline text-[#1D9BF0]'
              target='_blank'
            >
              Invite bot
            </a>
          </div>
          <FormItem
            label='Group Invite Link'
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
            <Input placeholder='Please paste the invite link to your telegram group' />
          </FormItem>
        </div>
      );
    },
    pick: ['link'],
  },
  7: {
    render: ({ name }) => {
      return (
        <div className='space-y-3'>
          <div className='text-sm font-medium text-c-9'>
            <p>Add TBOOK support bot as an admin to your channel</p>
            <a
              href='https://t.me/tbook_sign_bot'
              className='underline text-[#1D9BF0]'
              target='_blank'
            >
              Invite bot
            </a>
          </div>
          <FormItem
            label='Channel Invite Link'
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
            <Input placeholder='Please paste the invite link to your telegram channel' />
          </FormItem>
        </div>
      );
    },
    pick: ['link'],
  },
};
