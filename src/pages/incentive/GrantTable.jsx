import React from "react";
import { Table } from "antd";
import { grantStatusList, grantType } from "@/utils/const";
import { Link } from "react-router-dom";

export default function ({ list = [] }) {
  const columns = [
    {
      title: "GRANT ID",
      align:"center",
      render: (_, v) => (
        <Link
          to={`/incentive/grant/${v?.grant?.incentivePlanId}/${v?.grant?.grantId}/detail`}
        >
          <p className="text-[#38BDF8]">{v?.grant?.grantId}</p>
        </Link>
      ),
    },
    {
      title: "GRANTEE",
      align:"center",
      dataIndex: "granteeId",
      render(_, record) {
        return (
          <div className="flex">
            <img
              src={record?.grantee?.avatar}
              className="w-[50px] h-[50px] mr-2.5"
            />
            <div className="flex-none w-[145px] text-center">
              <h3 className="text-ellipsis	truncate  w-full font-bold text-[#1E293B] text-base	">
                {record?.grantee?.name}
              </h3>
              <p className="text-ellipsis	truncate  w-full text-[#94A3B8] text-xs">
                {record?.grantee?.mainWallet}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      className:"flex justify-center",
      render(_, record) {
        const stauts = record?.grant?.grantStatus;
        const content = grantStatusList
          .find((item) => stauts === item.value)
          ?.render();
        // Draft-编辑操作-跳转对应grant创建编辑页
        // signing的是链接
        return stauts === 2 ? (
          <Link to={`/grants/${record.grant?.grantId}/sign`}>{content}</Link>
        ) : (
          content
        );
      },
    },
    {
      title: "TOTAL TOKEN",
      align:"center",
      render(_, record) {
        return record?.grant?.grantNum;
      },
    },
    {
      title: "GRANT DATE",
      align:"center",
      render(_, record) {
        return record?.grant?.grantDate;
      },
    },
    {
      title: "VESTED",
      align:"center",
      render(_, record) {
        return record?.vestedAmount;
      },
    },
    {
      title: "VESTING SCHEDULE",
      align:"center",
      render(_, record) {
        return grantType.find((item) => item.value === record?.grant?.grantType)
          ?.name;
      },
    },
    {
      title: "ACTION",
      align:"center",
      render(_, record) {
        let text = "",
          link = "";
        switch (record?.grant?.grantStatus) {
          case 1:
            // 草稿
            text = "EDIT";
            link = `/incentive/grant/${record?.grant?.incentivePlanId}/create?grantId=${record?.grant?.grantId}`;
            break;

          case 2:
            // signing
            text = "SIGN";
            link = `/grants/${record?.grant?.grantId}/sign`;
            break;

          default:
            // view-
            text = "VIEW";
            link = `/incentive/grant/${record?.grant?.incentivePlanId}/${record?.grant?.grantId}/detail`;
        }

        return <Link to={link}>{text}</Link>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record?.grant?.grantId}
      dataSource={list}
    />
  );
}
