import { Tooltip, Typography } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import DisconnectIcon from '@/images/icon/svgr/disconnect.svg?react';
const { Paragraph } = Typography;

export default function Address ({ address, disconnect, children }) {
  const showDisconnect = typeof disconnect === 'function';
  return (
    <Tooltip
      title={
        <div>
          <Paragraph
            copyable={{
              text: address,
              icon: [
                <CopyOutlined style={{ color: 'rgba(255,255,255,0.8)' }} />,
                <CheckOutlined style={{ color: 'rgba(255,255,255,0.8)' }} />,
              ],
            }}
            style={{ margin: 0 }}
          >
            {address}
          </Paragraph>
          {showDisconnect && (
            <>
              <div className='h-px bg-white/10 my-2' />
              <button
                className='flex items-center gap-x-1 text-white'
                onClick={disconnect}
              >
                disconnect
                <DisconnectIcon />
              </button>
            </>
          )}
        </div>
      }
    >
      {children}
    </Tooltip>
  );
}
