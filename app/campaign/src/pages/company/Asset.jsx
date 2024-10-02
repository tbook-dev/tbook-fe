import { useNavigate, useLocation, useLoaderData } from 'react-router-dom';
import useAssetQuery from '@/hooks/useAssetQuery';

import AssetTabList from './componets/AssetTabList';
import Credentials from '../my/modules/Credential';

import NFT from '../my/modules/NFT';

import AssetPoints from './componets/AssetPoints'
import NotConnect from '../my/modules/NotConnect';

import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import Loading from '@/components/loading';

// import useAssetCompanyQuery from '@/hooks/useAssetCompanyQuery';

import clsx from 'clsx'


const tabModule = [
  {
    name: 'Credentials',
    value: '1',
    com: <Credentials isCompany={true} />,
  },
  // {
  //   name: 'NFTs',
  //   value: '2',
  //   com: <NFT isCompany={true} />,
  // },
  {
    name: 'Points',
    value: '3',
    com: <AssetPoints />,
  },
];

export default function CompanyAsset ({ pageType = 'project' }) {
  const { isLightTheme, companyId, companyName } = useLoaderData();
  const { userLogined, isLoading: userLoading } = useUserInfoQuery();

  const { pathname } = useLocation();
  const navigate = useNavigate();


  
  // const { isLoading } = useAssetCompanyQuery(companyId);
  const isLoading = false;

  // get filter from url
  const value =
    tabModule.find(
      (v) => v.value == new URLSearchParams(location.search).get('type')
    )?.value || '1';
  const setValue = (v) => {
    navigate(`${pathname}?type=${v}`, { replace: true });
    window.sessionRoutesCount -= 1;
  };
  
  return (
    <div className="pb-20 mx-auto space-y-4 w-page-content">
      <div className={
        clsx("flex flex-col gap-y-4 lg:gap-y-8 pt-3 pb-2 px-4 lg:px-0 border-b lg:border-none",
          isLightTheme ? 'border-[#E8E5E9] text-black' : 'border-[#160b25] text-white') }>
        <h2 className="text-xl font-bold">
          Assets
        </h2>

        <AssetTabList
          disabled={ !userLogined }
          tabs={ tabModule }
          value={ value }
          onSelect={ setValue }
          className="max-w-[100px]"
        />
      </div>

      <div className={ clsx("lg:px-0 min-h-screen",
        isLightTheme ? 'bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5]' : 'bg-black')}>
        { userLoading ? (
          <Loading className={ clsx(isLightTheme ? 'bg-black' : 'bg-white', "z-60") } text="Aggregating metrics..." />
        ) : userLogined ? (
          isLoading ? (
            <Loading className={ clsx(isLightTheme ? 'bg-black' : 'bg-white', "z-60") } text="Aggregating metrics..." />
          ) : (
            <div>{ tabModule.find((v) => v.value === value).com }</div>
          )
        ) : (
          <NotConnect />
        ) }
      </div>
    </div>
  );
}
