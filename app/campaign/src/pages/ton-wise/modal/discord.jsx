import { Modal, Form, Input, Spin } from 'antd';
import useSocial from '@/hooks/useSocial';
import dcSVG from '@/images/wise/dc.svg';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import clsx from 'clsx';

const moduleConf = {
  title: 'Submit Discord Server',
  connectText: 'Connect Discord',
  botLink:
    'https://discord.com/oauth2/authorize?client_id=1146414186566537288&permissions=2417034321&scope=bot',
  tip1: 'Invite Tbook support bot as an admin to your Discord server',
  tip2: 'Discord Server URL',
  tip3: 'Enter the Discord Server Invite Link',
};
export default function Discord ({ open, onClose, mutation }) {
  const { user } = useUserInfoQuery();
  const [form] = Form.useForm();
  const { getSocialByName } = useSocial();
  const discord = getSocialByName('discord');
  const validateUrl = (_, value) => {
    if (!value) {
      return Promise.reject('link is required');
    }

    const urlPattern = /^https?:\/\/\S+/;
    if (!urlPattern.test(value)) {
      return Promise.reject('link must be a valid URL');
    }

    if (!value.startsWith('https://discord.com/')) {
      return Promise.reject('link must start with "https://discord.com/"');
    }
    return Promise.resolve();
  };
  const handleSumbit = async values => {
    try {
      await mutation.mutateAsync({
        userId: user?.userId,
        socialType: 3,
        shareLink: values.link,
      });
      onClose();
      form.resetFields();
    } catch (error) {}
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      footer={null}
      closable={false}
      title={null}
    >
      <div className='-mx-6'>
        <h2 className='px-5 text-white font-medium text-base pb-3 border-b border-white/[0.1]'>
          {moduleConf.title}
        </h2>
        <Form form={form} className='space-y-7 w-full' onFinish={handleSumbit}>
          <div className='px-5 py-4 space-y-3'>
            <div className='flex gap-x-2'>
              <span className='font-zen-dot text-4xl w-7 text-center'>1</span>
              <div className='space-y-2'>
                <p className='text-sm text-white'>{moduleConf.connectText}</p>
                <button
                  onClick={discord.connected ? null : () => discord.loginFn()}
                  className='flex items-center gap-x-1 pl-3 pr-4 h-8 rounded-md bg-white text-black text-sm font-medium leading-none'
                >
                  <img src={dcSVG} />
                  {discord.connected
                    ? `@${discord.userName}`
                    : 'Connet Discord'}
                </button>
              </div>
            </div>
            <div className='flex gap-x-2'>
              <span className='font-zen-dot text-4xl w-7 text-center'>2</span>
              <div className='space-y-2 text-white'>
                <p className='text-sm'>{moduleConf.tip1}</p>
                <a
                  href={moduleConf.botLink}
                  target='_blank'
                  className='flex items-center w-max pl-3 pr-4 py-2 h-8 rounded-md bg-white text-black text-sm font-medium leading-none'
                >
                  Invite Bot
                </a>
              </div>
            </div>
            <div className='flex gap-x-2'>
              <span className='font-zen-dot text-4xl w-7 text-center'>3</span>
              <div className='space-y-2 flex-autostop-color'>
                <p className='text-sm text-white'>{moduleConf.tip2}</p>
                <Form.Item
                  name='link'
                  rules={[
                    {
                      validator: validateUrl,
                    },
                  ]}
                >
                  <Input
                    placeholder={moduleConf.tip3}
                    className='w-[263px]'
                    disabled={!discord.connected}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <button
            disabled={!discord.connected || mutation.isLoading}
            html='submit'
            className={clsx(
              discord.connected ? 'bg-white' : 'bg-white/30',
              'mx-4 gap-x-2 text-base font-medium flex items-center justify-center w-[calc(100%_-_32px)] py-2 rounded-md  text-black'
            )}
          >
            {mutation.isLoading && <Spin />}
            Submit
          </button>
        </Form>
      </div>
    </Modal>
  );
}
