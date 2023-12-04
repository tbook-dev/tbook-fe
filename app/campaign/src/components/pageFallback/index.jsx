import { Spin } from 'antd'

export default function PageFallBack() {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <Spin />
    </div>
  );
}
