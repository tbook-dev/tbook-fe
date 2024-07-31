import Drawer from '@/components/drawer';
import { ConfigProvider, message } from 'antd';
import { useMemo } from 'react';
import copy from 'copy-to-clipboard';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import ChatIcon from '@/images/icon/svgr/chat.svg?react';
import CopyIcon from '@/images/icon/svgr/copy.svg?react';
import MoreIcon from '@/images/icon/svgr/more.svg?react';

export default function ShareDrawer({
  open,
  onCancel,
  children,
  shareToChat,
  inviteLink,
  rawText,
  inviteTgUserFn,
  ShareButton,
  sucessFn,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: (
        <div className="px-3 py-4 backdrop-blur-md rounded-xl">{content}</div>
      ),
      className: 'mt-10',
      onClose,
    });
  };

  const actionList = useMemo(() => {
    return [
      {
        name: 'Share to chat',
        svg: <ChatIcon />,
        onClick: () => {
          shareToChat();
          sucessFn?.();
        },
      },
      {
        name: 'Copy link',
        svg: <CopyIcon />,
        onClick: () => {
          copy(rawText);
          openMessage('You have copied. Send to your friend now!');
          sucessFn?.();
        },
      },
      {
        name: 'More',
        svg: <MoreIcon />,
        onClick: () => {
          navigator
            .share({
              text: rawText,
              url: inviteLink,
            })
            .then(() => {
              sucessFn?.();
            })
            .catch((err) => {
              if (err.message?.includes('Permission denied')) {
                openMessage(err.message);
              }
            });
        },
      },
    ];
  }, [inviteLink, rawText]);
  return (
    <Drawer open={open} onCancel={onCancel}>
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
      <div className="text-white bg-white/10 px-8 pt-8 pb-16  space-y-6 rounded-t-2.5xl border-t-2 border-[#FFEAB5]">
        <div className="space-y-3">
          {children}

          <div className="pt-8 flex items-center justify-center gap-x-2 pb-3">
            {actionList.map((a) => {
              return (
                <button
                  className="btn-click w-1/3 flex flex-col items-center gap-y-1"
                  key={a.name}
                  onClick={a.onClick}
                >
                  <span className="size-10 rounded-full bg-[#FFDFA2]/10 flex items-center justify-center">
                    {a.svg}
                  </span>
                  {a.name}
                </button>
              );
            })}
          </div>

          {ShareButton ? (
            ShareButton
          ) : (
            <button
              onClick={inviteTgUserFn}
              className="relative font-syne border border-[#FFEAB5]  overflow-hidden rounded-lg bg-linear9 px-4 py-1.5 transition-all duration-75 ease-in group-active:[transform:translate3d(0,1px,0)] text-white btn-click flex items-center justify-center gap-x-1 text-xs w-full h-10"
            >
              <TgIcon width="16px" height="16px" />
              Invite friends
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
