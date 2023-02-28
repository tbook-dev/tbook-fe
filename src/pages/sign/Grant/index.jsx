import NotConnect from "./NotConnect";
import NoProject from "./NoProject";
import { useSelector } from "react-redux";
import useUserInfoLoading from "@/hooks/useUserInfoLoading";
import useProjects from "@/hooks/useProjects";
import { Spin } from "antd";
import GrantSign from "./GrantSign";



export default function () {
  const userLoading = useUserInfoLoading();
  const authUser = useSelector((state) => state.user.authUser);
  const projects = useProjects();

  if (userLoading) {
    return (
      <div className="flex pt-[120px] items-center justify-center">
        <Spin />
      </div>
    );
  }
  // 没有登录，展示登录按钮
  if (!authUser) {
    return <NotConnect />;
  }

  // 1. 登录之后，无项目，展示切换按钮
  if (projects.length === 0) {
    return <NoProject />;
  }
  // 2. 登录之后，有一个项目,
  // 3. 登录之后，有多个项目，当前所选项目

  return <GrantSign />;
}
