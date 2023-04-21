import { Button } from "@tbook/ui";
import { useSignIn } from "@tbook/hooks";
import { useResponsive } from "ahooks";

export default function ({
  title = "New Token Incentive Plan",
  paragraph = "Connect wallet to set up your incentive plan.",
}) {
  const { pc } = useResponsive();

  const { loading, handleSignIn } = useSignIn();
  // console.log({ loading, handleSignIn})
  return pc ? (
    <div className="hidden lg:flex items-center justify-between rounded-xl bg-cw1 w-full px-8 py-[38px]">
      <div>
        <p className="mb-1 text-cwh2 text-c-3">{title}</p>
        <p className="text-base text-c-3">{paragraph}</p>
      </div>

      <Button
        className="text-white bg-black dark:bg-white bg-none"
        loadingColor="#69D0E5"
        loading={loading}
        onClick={handleSignIn}
      >
        Connect Wallet
      </Button>
    </div>
  ) : (
    <div className="h-[180px] bg-cw1 rounded-xl flex justify-center items-center">
      <Button className="text-white bg-black dark:text-white bg-none" loading={loading} onClick={handleSignIn}>
        Connect Wallet
      </Button>
    </div>
  );
}
