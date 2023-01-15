import React, { useState, useCallback } from "react";
import { getProjectUsers, addProjectUser } from "../../api/incentive";
import { Table, Typography, Modal, Form } from "antd";
import { useAsyncEffect } from "ahooks";
import { roleList, getRoleNumber } from "../../utils/const";
import GranteeFrom from "../../pages/incentive/GranteeForm";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";


const { Paragraph } = Typography;

function MemberPanel() {
  const [roleType, setRoleType] = useState(0);
  const [users, setUsers] = useState([]);
  const [showModal, setModal] = useState(false);

  const [form] = Form.useForm();

  const [searchName, updateSearchName] = useState("");

  const projectId = useCurrentProjectId();

  useAsyncEffect(async () => {
    if (projectId) {
      const res = await getProjectUsers(projectId);
      setUsers(res?.users || []);
    }
  }, [projectId]);

  const getColumns = () => {
    return [
      {
        title: "NAME",
        dataIndex: "name",
      },
      {
        title: "EMAIL",
        dataIndex: "email",
      },
      {
        title: "Grant Address",
        dataIndex: "mainWallet",
        render: (v) => {
          return (
            <div className="w-[145px]">
              <Paragraph
                style={{ width: 145 }}
                ellipsis={{
                  rows: 1,
                }}
                copyable={{
                  tooltips: ["copy", "copy succeeded"],
                }}
              >
                {v}
              </Paragraph>
            </div>
          );
        },
      },
      {
        title: "Access Rights",
        dataIndex: "role",
        render(v) {
          return (
            <div className="text-[#38BDF8] text-sm">
              {roleList.find((i) => i.code === v)?.desc}
            </div>
          );
        },
      },
    ];
  };
  const getFinalUsers = useCallback(() => {
    let filterRoleList = [];
    if (roleType === 0) {
      filterRoleList = users;
    }
    if (roleType !== 0) {
      filterRoleList = users.filter((user) => user.role === roleType);
    }
    let filterSearchList = filterRoleList;
    if (!searchName) {
      filterSearchList = filterRoleList;
    }
    if (searchName) {
      filterSearchList = filterRoleList.filter((user) =>
        user.name?.includes(searchName)
      );
    }
    return filterSearchList;
  }, [roleType, searchName, users]);

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div className="w-full pr-4 mx-auto sm:pr-6 lg:pr-8 max-w-9xl">
          {/* Page header */}
          <div className="mb-5 sm:flex sm:justify-between sm:items-center">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl font-bold md:text-3xl text-slate-800">
                Members
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
              <div className="relative">
                <label htmlFor="action-search" className="sr-only">
                  Search
                </label>
                <input
                  id="action-search"
                  className="form-input pl-9 focus:border-slate-300"
                  onChange={(event) => {
                    updateSearchName(event.target.value);
                  }}
                  value={searchName}
                  type="search"
                  placeholder="Search by name ..."
                />
                <button
                  className="absolute inset-0 right-auto group"
                  type="submit"
                  aria-label="Search"
                >
                  <svg
                    className="w-4 h-4 ml-3 mr-2 fill-current shrink-0 text-slate-400 group-hover:text-slate-500"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </div>
              {/* Create invoice button */}
              <button
                onClick={() => setModal(true)}
                className="text-white bg-indigo-500 btn hover:bg-indigo-600"
              >
                <svg
                  className="w-4 h-4 opacity-50 fill-current shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden ml-2 xs:block">Add Members</span>
              </button>
            </div>
          </div>
          <div className="mb-4 sm:mb-0">
            <ul className="flex flex-wrap -m-1">
              <li className="m-1">
                <button
                  onClick={() => {
                    setRoleType(0);
                  }}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border
                                  ${
                                    roleType === 0
                                      ? " border-transparent text-white bg-indigo-500 "
                                      : " border-slate-200 hover:border-slate-300 bg-white text-slate-500 "
                                  }
                                  shadow-sm   duration-150 ease-in-out`}
                >
                  All
                  <span className="ml-1 text-indigo-200">{users.length}</span>
                </button>
              </li>

              {roleList.map((role) => {
                return (
                  <li className="m-1" key={role.code}>
                    <button
                      onClick={() => {
                        setRoleType(role.code);
                      }}
                      className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border
                                          ${
                                            roleType === role.code
                                              ? " border-transparent text-white bg-indigo-500 "
                                              : " border-slate-200 hover:border-slate-300 bg-white text-slate-500 "
                                          }
                                          shadow-sm   duration-150 ease-in-out`}
                    >
                      {role.desc}
                      <span className="ml-1 text-slate-400">
                        {getRoleNumber(role.code, users)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Table */}
        <Modal
          open={showModal}
          onCancel={() => {
            setModal(false);
          }}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                addProjectUser(projectId, {
                  projectId,
                  walletAddress: values.granteeEthAddress,
                  email: values.granteeEmail,
                  name: values.granteeName,
                  userRole: 4,
                }).then(() => {
                  getProjectUsers(projectId).then((res) => {
                    setUsers(res?.users || []);
                  });
                });
              })
              .catch(console)
              .finally(() => {
                setModal(false)
              })

            console.log("ok");
          }}
          title="Invite"
          okText="Don"
        >
          <GranteeFrom form={form} />
        </Modal>

        <Table
          columns={getColumns()}
          rowKey="userId"
          dataSource={getFinalUsers()}
        />
      </div>
    </div>
  );
}

export default MemberPanel;
