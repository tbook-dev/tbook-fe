import { Typography } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { shortAddress } from '@tbook/utils/lib/conf';
import clsx from 'clsx';

const { Paragraph } = Typography;

export default function Address ({ address, className, icon }) {
  return (
    <Paragraph
      copyable={{
        text: address,
        icon: [
          <CopyOutlined style={{ color: 'rgba(255,255,255,0.8)' }} />,
          <CheckOutlined style={{ color: 'rgba(255,255,255,0.8)' }} />,
        ],
      }}
      style={{ margin: 0 }}
      className={clsx(className, 'inline-flex items-center gap-x-2')}
    >
      {icon}
      {shortAddress(address)}
    </Paragraph>
  );
}
