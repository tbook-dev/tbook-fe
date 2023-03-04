import { Empty } from "antd";
import emptyUrl from "@/images/icon/empty.svg";

export default function ({
  description = "No grants",
  img = emptyUrl,
  ...props
}) {
  return (
    <Empty
      image={emptyUrl}
      description={<span className="dark:text-disable">{description}</span>}
      {...props}
    />
  );
}
