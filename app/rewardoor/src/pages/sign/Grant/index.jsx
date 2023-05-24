import NotConnect from "./NotConnect";
import NoProject from "./NoProject";
import { useSelector } from "react-redux";
import { useUserInfoLoading, useProjects } from "@tbook/hooks";
import { Spin } from "antd";
import GrantSign from "./GrantSign";
import { useResponsive } from "ahooks";
import { Back } from "@tbook/ui";

export default function () {
  const userLoading = useUserInfoLoading();
  const authUser = useSelector((state) => state.user.authUser);
  const projects = useProjects();
  const { pc } = useResponsive();

  if (userLoading) {
    return (
      <div className="flex pt-[120px] items-center justify-center">
        <Spin />
      </div>
    );
  }
  // 没有登录，展示登录按钮
  if (!authUser) {
    return (
      <>
        {!pc && <Back />}
        <NotConnect />
      </>
    );
  }

  // 1. 登录之后，无项目，展示切换按钮
  if (projects.length === 0) {
    return (
      <>
        {!pc && <Back />}
        <NoProject />
      </>
    );
  }
  // 2. 登录之后，有一个项目,
  // 3. 登录之后，有多个项目，当前所选项目

  return <GrantSign />;
}
