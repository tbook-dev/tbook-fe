import { shortAddress } from '@/utils/const' 


export default function ({ avatar, name, mainWallet }) {
  return (
    <div>
      <div className="flex py-2 pl-4 rounded-lg bg-[#ECF1FF]">
        <div className="w-10 h-10 bg-[#0049FF] mr-4 rounded-full flex justify-center items-center">
          <img src={avatar} className="w-6 h-6" />
        </div>

        <div>
          {name && <h3 className="lg:text-[16px] lg:leading-[24px] text-[#333]">{name}</h3>}
          {mainWallet && (
            <p className=" text-[#999] lg:text-[14px] lg:leading-[20px]">
              {shortAddress(mainWallet)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
