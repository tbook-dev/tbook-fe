import { Modal, Form, Input } from 'antd';
import useSocial from '@/hooks/useSocial';
import dcSVG from '@/images/wise/dc.svg';

const moduleConf = {
  title: 'Submit Discord Server',
  connectText: 'Connect Discord',
  botLink: 'https://discord.com/oauth2/authorize?client_id=1146414186566537288&permissions=2417034321&scope=bot',
  tip1: 'Invite Tbook support bot as an admin to your Discord server',
  tip2: 'Discord Server Invite Link',
  tip3: 'Enter the Discord Server Invite Link',
};
export default function Discord({ open, onClose }) {
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
  const handleSumbit = (values) => {
    console.log({ values, discord });
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
      <div className="-mx-6">
        <h2 className="px-5 text-white font-medium text-base pb-3 border-b border-white/[0.1]">
          {moduleConf.title}
        </h2>
        <Form form={form} className="space-y-7 w-full" onFinish={handleSumbit}>
          <div className="px-5 py-4 space-y-3">
            <div className="flex gap-x-2">
              <span className="font-zen-dot text-4xl w-7 text-center">1</span>
              <div className="space-y-2">
                <p className="text-sm text-white">{moduleConf.connectText}</p>
                <button className="flex items-center gap-x-1 pl-3 pr-4 h-8 rounded-md bg-white text-black text-sm font-medium leading-none">
                  <img src={dcSVG} />{ discord.connected ? `@${discord.userName}`: 'Connet Discord'}
                </button>
              </div>
            </div>
            <div className="flex gap-x-2">
              <span className="font-zen-dot text-4xl w-7 text-center">2</span>
              <div className="space-y-2 text-white">
                <p className="text-sm">{moduleConf.tip1}</p>
                <button className="flex items-center gap-x-1 pl-3 pr-4 py-2 h-8 rounded-md bg-white text-black text-sm font-medium leading-none">
                  Invite Bot
                </button>
              </div>
            </div>
            <div className="flex gap-x-2">
              <span className="font-zen-dot text-4xl w-7 text-center">3</span>
              <div className="space-y-2 flex-autostop-color">
                <p className="text-sm text-white">{moduleConf.tip2}</p>
                <Form.Item
                  name="link"
                  rules={[
                    {
                      validator: validateUrl,
                    },
                  ]}
                >
                  <Input placeholder={moduleConf.tip3} className="w-[263px]" />
                </Form.Item>
              </div>
            </div>
          </div>
          <button
            html="submit"
            className="mx-4 text-base font-medium block w-[calc(100%_-_32px)] py-2 text-center rounded-md bg-white text-black"
          >
            Submit
          </button>
        </Form>
      </div>
    </Modal>
  );
}
