import Button from "@/components/button";
import useSignIn from "@/hooks/useSignIn";
import grante403 from "@/images/incentive/grantee403.png";

export default function () {
  const { loading, handleSignIn } = useSignIn();

  return (
    <div
      className="absolute inset-0 flex items-center bg-center bg-cover"
      style={{ backgroundImage: `url(${grante403})` }}
    >
      <div className="w-[80vw] text-center lg:text-left mx-auto lg:w-[578px] lg:ml-[120px]">
        <h2 className="inline-block mb-5 font-extrabold text-white text-ch1 lg:text-cwh4 lg:mb-6">
          <span className="mr-4 text-colorful1">Connect</span>the wallet to
          check your grants.
        </h2>
        <Button
          className="dark:hover:!font-medium !border-none"
          loading={loading}
          onClick={handleSignIn}
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
