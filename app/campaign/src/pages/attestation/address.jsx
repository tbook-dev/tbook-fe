import { Typography } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { shortAddress } from '@tbook/utils/lib/conf';

const { Paragraph } = Typography;

export default function Address ({ address }) {
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
    >
      {shortAddress(address)}
    </Paragraph>
  );
}
