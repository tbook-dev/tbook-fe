import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { Spin } from 'antd';
import { useState } from 'react';

const aboardPath = '/aboard';
const applyPath = '/waitlist/apply';
const newProjectPath = '/new-project';
const whiteListPaths = [aboardPath, applyPath];
export default function LayoutAdmin () {
  // const location = useLocation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { error, userLogined, projects, isLoading } = useUserInfo();
  const [firstLoad, setFirstLoad] = useState(false);
  useEffect(() => {
    if (error && error.code === 401 && !whiteListPaths.includes(pathname)) {
      // navigate(
      //   `${aboardPath}?redirect=${encodeURIComponent(
      //     location.pathname + location.search
      //   )}`
      // );
      navigate(aboardPath);
    }
  }, [error, pathname]);

  useEffect(() => {
    if (
      userLogined &&
      Array.isArray(projects) &&
      projects.length === 0 &&
      !whiteListPaths.includes(pathname)
    ) {
      navigate(newProjectPath);
    }
  }, [projects, pathname]);

  useEffect(() => {
    if (!firstLoad && !isLoading) {
      setFirstLoad(true);
      return;
    }
  }, [isLoading]);

  // console.log({firstLoad, isLoading})
  return (
    <div className='flex flex-col min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]'>
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        {!firstLoad ? (
          <div className='flex pt-40 justify-center'>
            <Spin spinning />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
