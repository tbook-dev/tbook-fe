import { Space } from "antd";
import { useResponsive } from "ahooks";

export default function AvatarSkeleton() {
  const { pc } = useResponsive();
  return pc ? (
    <Space>
      <div className="w-8 h-8 rounded-full bg-l-6" />
      <div className="h-8 bg-l-6 rounded w-[100px]" />
    </Space>
  ) : (
    <Space>
      <div className="w-8 h-8 rounded-full bg-l-6" />
      <div className="h-9 bg-l-6 rounded w-9" />
    </Space>
  );
}
