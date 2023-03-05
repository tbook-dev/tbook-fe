import grante403 from "@tbook/share/images/incentive/grantee403.png";
import mgrante403 from "@tbook/share/images/incentive/mgrantee403.png";
import { useResponsive } from "ahooks";
import { useEffect } from 'react';
import { setLessNav } from '@/store/user'
import { useDispatch } from "react-redux";


export default function () {
  const { pc } = useResponsive();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLessNav(true));
    return () => {
      dispatch(setLessNav(false));
    }
  }, []);

  return (
    <div
      className="absolute inset-0 lg:flex lg:items-center lg:bg-center lg:bg-cover"
      style={pc ? { backgroundImage: `url(${grante403})` } : null}
    >
      <img src={mgrante403} className="block lg:hidden" />

      <div className="w-[80vw] text-center mx-auto lg:text-left lg:w-[700px] lg:ml-[120px]">
        <span className="hidden lg:inline-block py-px px-4 mb-1 border border-[#69D0E5] rounded text-c5 text-colorful1">
          Error
        </span>
        <h2 className="font-extrabold text-white text-ch1 lg:text-cwh4">
          <span className="mr-4 text-colorful1">Switch</span>
          to another address to check your access.
        </h2>
      </div>
    </div>
  );
}
