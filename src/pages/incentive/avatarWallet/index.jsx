import { shortAddress } from '@/utils/const' 


export default function ({ avatar, name, mainWallet }) {
  return (
    <div>
      <div className="flex py-1 pl-4 rounded-lg bg-b-6">
        <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-l-1">
          <img src={avatar} className="w-5 h-5" />
        </div>

        <div className="flex flex-col justify-center">
          {mainWallet && (
            <p className="text-black lg:text-c1">
              {shortAddress(mainWallet)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
