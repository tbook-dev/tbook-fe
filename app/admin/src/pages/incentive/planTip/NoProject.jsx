import { Button } from "@tbook/ui";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

export default function ({ pc, link, desc = "Click to set up your incentive plan." }) {
  // console.log({ loading, handleSignIn})
  return pc ? (
    <div className="hidden lg:flex items-center justify-between rounded-xl  w-full bg-cw1 px-8 py-[38px]">
      <div>
        <p className="mb-1 text-cwh2 text-c-3">New Token Incentive Plan</p>
        <p className="text-base text-c-3">{desc}</p>
      </div>

      <Link to={link}>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 text-xs font-medium leading-normal text-black transition duration-150 ease-in-out bg-black rounded-md lg:text-white bg-cw1 dark:text-black lg:bg-none lg:hover:opacity-70 lg:hover:dark:opacity-100 lg:w-40 lg:h-10 lg:dark:bg-white lg:dark:bg-none lg:rounded-lg lg:dark:text-black shadow-d3 lg:dark:hover:text-white lg:dark:hover:bg-cw1 lg:hover:shadow-d7"
        >
          <PlusOutlined style={pc ? null : { fontSize: "16px" }} />
          <span className="ml-2 text-[14px] hidden lg:inline">New Plan</span>
        </button>
      </Link>
    </div>
  ) : (
    <div className="h-[180px] bg-cw1 rounded-xl flex justify-center items-center">
      <Link to={link}>
        <Button className="w-[80vw] bg-none bg-black text-white dark:text-white">
          <PlusOutlined />
          <span className="ml-3">New Plan</span>
        </Button>
      </Link>
    </div>
  );
}
