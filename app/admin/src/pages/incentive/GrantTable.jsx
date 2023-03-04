import React from "react";
import { Table, ConfigProvider, Empty } from "antd";
import { grantStatusList, grantType, formatDollar } from "@/utils/const";
import { Link } from "react-router-dom";
import { shortAddress } from "@/utils/const";

export default function ({ list = [], loading = false }) {
  const columns = [
    {
      title: "GRANT ID",
      align: "center",
      render: (_, v) => (
        <Link to={`/grants/${v?.grant?.grantId}/sign`}>
          <p className="text-[#0049FF]">{v?.grant?.grantId}</p>
        </Link>
      ),
    },
    {
      title: "GRANTEE",
      align: "center",
      dataIndex: "granteeId",
      render(_, record) {
        return (
          <div className="flex">
            <img
              src={record?.grantee?.avatar}
              className="w-[40px] h-[40px] rounded-full mr-1.5"
            />
            <div className="flex flex-col justify-center flex-none">
              <h3 className="text-ellipsis w-max-[130px]	truncate font-bold text-[#202124] text-base">
                {record?.grantee?.name}
              </h3>
              <p className="text-ellipsis	truncate text-[#45484F] text-sm">
                {shortAddress(record?.grantee?.mainWallet)}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      // className:"flex justify-center",
      render(_, record) {
        const stauts = record?.grant?.grantStatus;
        const content = grantStatusList
          .find((item) => stauts === item.value)
          ?.render();
        // Draft-编辑操作-跳转对应grant创建编辑页
        // signing的是链接
        return (
          <Link to={`/grants/${record.grant?.grantId}/sign`}>{content}</Link>
        );
      },
    },
    {
      title: "GRANT DATE",
      align: "center",
      render(_, record) {
        return record?.grant?.grantDate;
      },
    },
    {
      title: "VESTING BY",
      align: "center",
      render(_, record) {
        const type = grantType.find(
          (item) => item.value === record?.grant?.grantType
        );
        return (
          <div className="flex">
            {type?.label}
            <img src={type?.icon} className="ml-2" />
          </div>
        );
      },
    },
    {
      title: "TOTAL TOKEN",
      align: "center",
      render(_, record) {
        return formatDollar(record?.grant?.grantNum);
      },
    },
    {
      title: "VESTED TOKEN",
      align: "center",
      render(_, record) {
        return formatDollar(record?.vestedAmount);
      },
    },

    // {
    //   title: "ACTION",
    //   align:"center",
    //   render(_, record) {
    //     let text = "",
    //       link = "";
    //     switch (record?.grant?.grantStatus) {
    //       case 1:
    //         // 草稿
    //         text = "EDIT";
    //         link = `/incentive/grant/${record?.grant?.incentivePlanId}/create?grantId=${record?.grant?.grantId}`;
    //         break;

    //       case 2:
    //         // signing
    //         text = "SIGN";
    //         link = `/grants/${record?.grant?.grantId}/sign`;
    //         break;

    //       default:
    //         // view-
    //         text = "VIEW";
    //         link = `/incentive/grant/${record?.grant?.incentivePlanId}/${record?.grant?.grantId}/detail`;
    //     }

    //     return <Link to={link}>{text}</Link>;
    //   },
    // },
  ];

  return (
    <Table
      bordered
      loading={loading}
      columns={columns}
      rowKey={(record) => record?.grant?.grantId}
      dataSource={list}
    />
  );
}
