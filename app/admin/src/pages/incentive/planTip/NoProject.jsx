import Button from "@/components/button";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

export default function ({ pc, link }) {
  // console.log({ loading, handleSignIn})
  return pc ? (
    <div className="hidden lg:flex items-center justify-between rounded-xl  w-full dark:bg-cw1 px-8 py-[38px]">
      <div>
        <p className="mb-1 text-cwh2 text-c-3">New Token Incentive Plan</p>
        <p className="text-base text-c-3">
          Click to set up your incentive plan.
        </p>
      </div>

      <Link to={link}>
        <Button
          type="button"
          className="flex items-center justify-center text-xs font-medium leading-normal transition duration-150 ease-in-out lg:w-40 lg:h-10 dark:bg-white lg:rounded-lg dark:text-black shadow-d3 hover:text-white hover:bg-cw1 hover:shadow-d7"
        >
          <PlusOutlined />
          <span className="ml-2 text-[14px]">New Plan</span>
        </Button>
      </Link>
    </div>
  ) : (
    <div className="h-[180px] bg-cw1 rounded-xl flex justify-center items-center">
      <Link to={link}>
        <Button className="w-[80vw] bg-none bg-black dark:text-white">
          <PlusOutlined />
          <span className="ml-3">New Plan</span>
        </Button>
      </Link>
    </div>
  );
}
