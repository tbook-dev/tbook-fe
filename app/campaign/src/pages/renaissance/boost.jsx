import { ConfigProvider, message } from 'antd';

export default function Scratch () {
  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: (
        <div className='px-3 py-4 backdrop-blur-md rounded-xl'>
          🌟🌟 {content} 🌟🌟
        </div>
      ),
      className: 'mt-10',
      onClose,
    });
  };

  return (
    <div className='space-y-5 mx-auto overflow-hidden transition-all shadow-xl'>
      <button
        onClick={() => {
          openMessage('xxx');
        }}
      >
        click me
      </button>
      <div className='h-[200px] bg-red-400' />
      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: `rgba(255, 223, 162, 0.15)`,
              contentPadding: 0,
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
    </div>
  );
}
