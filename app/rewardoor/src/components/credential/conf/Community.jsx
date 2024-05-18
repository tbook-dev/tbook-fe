import { Form, Input, Spin } from 'antd';
import dcInviteImg from '@/images/dc-invite.png';
import Invitebot from '../components/invitebot';
import useDcRoles from '@/hooks/queries/useDcRoles';
import { useEffect } from 'react';
import SelectWraper from '@/components/wraper/select';

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

  // discord verify server
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
  // discord, verify role
  //https://discord.gg/S8jW2wMv
  5: {
    render: ({ name, form }) => {
      const serverLink = Form.useWatch(['credential', name, 'link'], form);
      const { data: remoteRoles, isLoading } = useDcRoles(serverLink);
      useEffect(() => {
        if (remoteRoles === null) {
          form.setFieldValue(['credential', name, 'roleId'], undefined);
        }
      }, [remoteRoles]);
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
            label='Role'
            name={[name, 'roleId']}
            rules={[
              {
                required: true,
                message: 'Please input valid value!',
              },
            ]}
          >
            <SelectWraper
              notFoundContent={
                isLoading ? <Spin size='small' className='ml-3' /> : null
              }
              mode='multiple'
              options={remoteRoles}
              placeholder='Select role after you input the valid Server Link'
            />
          </FormItem>
        </div>
      );
    },

    pick: ['link', 'roleId'],
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
