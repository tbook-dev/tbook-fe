import Button from "@/components/button";
import bgm from "@/images/incentive/all-plan-m.png";
import useSignIn from "@/hooks/useSignIn";

export default function ({ pc }) {
  const { loading, handleSignIn } = useSignIn();
  // console.log({ loading, handleSignIn})
  return pc ? (
    <div
      className="hidden lg:flex items-center justify-between rounded-xl dark:bg-cw1 w-full px-8 py-[38px]"
    >
      <div>
        <p className="mb-1 text-cwh2 text-c-3">
          New Token Incentive Plan
        </p>
        <p className="text-base text-c-3">
          Connect wallet to set up your incentive plan.
        </p>
      </div>

      <Button className="dark:hover:!font-medium !border-none" loading={loading} onClick={handleSignIn}>
        Connect Wallet
      </Button>
    </div>
  ) : (
    <div
      className="h-[180px] bg-cover shadow-c2 rounded-2xl flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgm})`,
      }}
    >
      <Button size="large" type="primary" loading={loading} onClick={handleSignIn}>
        Connect Wallet
      </Button>
    </div>
  );
}
