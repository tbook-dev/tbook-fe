import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadWeb3, signLoginMetaMask } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo, setCurrentProjectId } from "../store/user";
import AuthDecoration from "../images/tbook/aircraft.png";
import AuthImage from "../images/tbook/login.png";
import { Button } from "antd";
import { getUserInfo } from "@/api/incentive";
import { getCurrentProjectId } from "@/api/ls";
import { useSigner, useAccount } from "wagmi";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispath = useDispatch();
  const web3Ref = useRef();

  const { data: signer } = useSigner()
  const { address } = useAccount()

  useEffect(() => {
    async function asyncloadWeb3() {
      const web3 = await loadWeb3();
      web3Ref.current = web3;
    }
    asyncloadWeb3();
  }, []);

  async function handleSignIn() {
    setLoading(true);
    await signLoginMetaMask(address, signer);

    dispath(fetchUserInfo());
    dispath(setAuthUser(true));
    const user = await getUserInfo();
    // console.log('user', user)
    if (user.projects.length > 0) {
      let link = `/incentive`;
      if (!getCurrentProjectId()) {
        // 如果之前没有浏览，即ls没有数据，则去最后一个project相关信息
        const project = user.projects.pop();
        dispath(setCurrentProjectId(project.projectId));
        // 是被授予人
        if (project.currentUserRole === 4) {
          link = `/my-grants`;
        }
      }
      navigate(link);
    } else {
      navigate("/project-create");
    }
    setLoading(false);
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
                Welcome To Tbook!
              </h1>
              {/* Form */}
            </div>
            <div className="flex flex-col items-center justify-center mt-28">
              <Button type="primary" loading={loading} onClick={handleSignIn}>
                LogIn
              </Button>
              {/* <br />
              <div className="text-sm">
                Don't have an account?{" "}
                <Link
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  to="/signin"
                >
                  Sign Up
                </Link>
              </div> */}
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

export default Login;
