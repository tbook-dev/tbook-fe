import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { loadWeb3 } from "../utils/web3";
import { Form, Input } from "antd";
import { debounce } from "lodash";

import AuthDecoration from "../images/tbook/aircraft.png";
import AuthImage from "../images/tbook/login.png";

function Signin() {
  const web3Ref = useRef();
  useEffect(() => {
    async function asyncloadWeb3() {
      const web3 = await loadWeb3();
      web3Ref.current = web3;
    }
    asyncloadWeb3();
  }, []);
  const [form] = Form.useForm();

  function handleSignIn(evt) {
    evt?.preventDefault();

    form
      .validateFields()
      .then((values) => {
        fetch(
          `/nonce?address=${web3Ref?.current.currentProvider.selectedAddress}`,
          { credentials: "include" }
        )
          .then((r) => r.text())
          .then((t) =>
            web3Ref?.current.eth.personal.sign(
              web3Ref.current.utils.fromUtf8(t),
              web3Ref?.current.currentProvider.selectedAddress
            )
          )
          .then((s) => {
            const d = new FormData();
            d.append(
              "address",
              web3Ref?.current.currentProvider.selectedAddress
            );
            d.append("sign", s);
            return fetch(`/authenticate`, {
              credentials: "include",
              method: "POST",
              body: d,
            });
          })
          .then((r) => {
            var authHeader = r.headers.get("Authorization");
            console.log({ authHeader });
            // return fetch("info", {
            //   credentials: "include",
            //   headers: {
            //     Authorization: authHeader,
            //   },
            // });
            const d = new FormData();
            d.append("email", values.email);
            d.append("name", values.name);
            return fetch(`/users/update`, {
              credentials: "include",
              method: "POST",
              body: d,
            });
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
          <div className="min-h-screen h-full flex flex-col after:flex-1">
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

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Welcome To Tbook!
              </h1>
              {/* Form */}
              <Form form={form} layout="vertical">
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <div className="flex flex-col items-center justify-end	 mt-28">
                  <button
                    type="submit"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={debounce(handleSignIn, 300)}
                  >
                    Sign Up
                  </button>
                  <br />
                  <div className="text-sm">
                    Have an account?{" "}
                    <Link
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      to="/logins"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-0 md:w-1/2"
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
            className="absolute top-1/4 right-0 translate-x-1/2 ml-8 hidden lg:block"
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

export default Signin;
