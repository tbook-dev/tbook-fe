import { Space } from "antd";
import { useResponsive } from "ahooks";

export default function AvatarSkeleton() {
  const { pc } = useResponsive();
  return pc ? (
    <Space>
      <div className="w-8 h-8 rounded-full bg-l-6 animate-pulse" />
      <div className="h-8 bg-l-6 rounded w-[100px] animate-pulse" />
    </Space>
  ) : (
    <Space>
      <div className="w-8 h-8 rounded-full bg-l-6 animate-pulse" />
      <div className="h-9 bg-l-6 rounded w-9 animate-pulse" />
    </Space>
  );
}
