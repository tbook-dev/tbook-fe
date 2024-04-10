import { Modal, Form, Input } from 'antd';
import useSocial from '@/hooks/useSocial';
import tgSVG from '@/images/wise/tg.svg';

const moduleConf = {
  title: 'Submit Telegram Group/Channel link',
  connectText: 'Connect telegram',
  botLink: 'https://t.me/tbook_sign_bot',
  tip1: 'Invite TBook support bot as an admin to your Telegram group/channel',
  tip2: 'Paste telegram group/channel share link',
  tip3: 'https://t.me/tbookincentive',
};
export default function Telegram({ open, onClose }) {
  const [form] = Form.useForm();
  const { getSocialByName } = useSocial();
  const telegram = getSocialByName('telegram');
  const validateUrl = (_, value) => {
    if (!value) {
      return Promise.reject('link is required');
    }

    const urlPattern = /^https?:\/\/\S+/;
    if (!urlPattern.test(value)) {
      return Promise.reject('link must be a valid URL');
    }

    if (!value.startsWith('https://t.me/')) {
      return Promise.reject('link must start with "https://t.me/"');
    }
    return Promise.resolve();
  };
  const handleSumbit = (values) => {
    console.log({ values, telegram });
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
                <button className="flex items-center gap-x-1 pl-3 pr-4 py-1 rounded-md bg-white text-black text-sm font-medium leading-none">
                  <img src={tgSVG} />@{telegram.userName}
                </button>
              </div>
            </div>
            <div className="flex gap-x-2">
              <span className="font-zen-dot text-4xl w-7 text-center">2</span>
              <div className="space-y-2 text-white">
                <p className="text-sm">{moduleConf.tip1}</p>
                <button className="flex items-center gap-x-1 pl-3 pr-4 py-1 rounded-md text-white border border-white text-sm font-medium leading-none">
                  <img src={tgSVG} />
                  @tbook_sign_bot
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
                  <Input placeholder={moduleConf.tip3} className="w-full" />
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
