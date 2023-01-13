import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { debounce } from "lodash";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { host } from '@/api/incentive'

import AuthDecoration from "../images/tbook/aircraft.png";
import AuthImage from "../images/tbook/login.png";

function CreateProject() {

  const [form] = Form.useForm();
  const navigate = useNavigate()

  function handleCreateProject(evt) {
    evt?.preventDefault();

    form
      .validateFields()
      .then((values) => {
       
        fetch(`${host}/projects`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify(values),
        }).then((res) => {
          console.log(res);
          navigate("/incentive/create")
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2" />
        <div className="md:w-1/2">
          <div className="flex flex-col h-full min-h-screen after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient
                        x1="28.538%"
                        y1="20.229%"
                        x2="100%"
                        y2="108.156%"
                        id="logo-a"
                      >
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="88.638%"
                        y1="29.267%"
                        x2="22.42%"
                        y2="100%"
                        id="logo-b"
                      >
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path
                      d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                      fill="url(#logo-a)"
                    />
                    <path
                      d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                      fill="url(#logo-b)"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm px-4 py-8 mx-auto">
              <h1 className="mb-6 text-3xl font-bold text-slate-800">
                注册项目并开启激励计划...
              </h1>
              {/* Form */}
              <Form form={form} layout="vertical" requiredMark={false}>
                <Form.Item
                  name="projectName"
                  label="Project Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Project Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="flex items-center justify-between mt-28">
                  <Link to="/signin">
                    <span className="text-[#94A3B8]">
                      <ArrowLeftOutlined />
                      <span className="ml-1">Back</span>
                    </span>
                  </Link>
                  <button
                    type="submit"
                    className="text-white bg-indigo-500 btn hover:bg-indigo-600"
                    onClick={debounce(handleCreateProject, 300)}
                  >
                    Next Step
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="absolute top-0 bottom-0 left-0 hidden md:block md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
          <img
            className="absolute right-0 hidden ml-8 translate-x-1/2 top-1/4 lg:block"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          />
        </div>
      </div>
    </main>
  );
}

export default CreateProject;
