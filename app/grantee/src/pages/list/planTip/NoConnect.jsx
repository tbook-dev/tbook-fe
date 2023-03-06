import { Button } from "@tbook/ui";
import { useSignIn } from "@tbook/hooks";


export default function NoConnect({ list, projectName, pc }) {
  const { loading, handleSignIn } = useSignIn();

  return (
    <div className="flex flex-col justify-between h-full px-4 pt-6 pb-3 text-black rounded-xl lg:rounded-2xl lg:p-10 dark:bg-cw1 lg:shadow-d6">
      <div className="flex">
        <h2 className="font-bold text-cwh5 lg:ch2">{projectName}</h2>
        <Button
          className="bg-black dark:text-white bg-none dark:lg:text-black lg:bg-white"
          loadingColor={pc ? "#69D0E5" : null}
          loading={loading}
          onClick={handleSignIn}
        >
          Connect Wallet
        </Button>
      </div>

      <div className="block space-y-1 lg:flex lg:justify-between">
        {list.map((info, idx) => (
          <div className="flex flex-row items-center justify-between lg:block" key={idx}>
            <div>
              <info.value />
            </div>
            <div className="text-c1">{info.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
