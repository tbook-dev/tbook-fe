import { useNavigate, useLocation, useLoaderData } from 'react-router-dom';

import TabList from '../my/TabList';
import Credentials from '../my/modules/Credential';
import NFT from '../my/modules/NFT';
import Point from '../my/modules/Point';
import NotConnect from '../my/modules/NotConnect';

import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import Loading from '@/components/loading';

// import useAssetCompanyQuery from '@/hooks/useAssetCompanyQuery';

import clsx from 'clsx'

import Layout from '@/layout/custom/Layout';

const tabModule = [
  {
    name: 'Credentials',
    value: '1',
    com: <Credentials isCompany={true} />,
  },
  {
    name: 'NFTs',
    value: '2',
    com: <NFT isCompany={true} />,
  },
  {
    name: 'Points',
    value: '3',
    com: <Point isCompany={true} />,
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
    <Layout title={ companyName || '' }>
      <div className="mx-auto space-y-8 w-page-content pb-28">
        <div className={ clsx("flex flex-col gap-y-4 lg:gap-y-8 pt-3 pb-4 px-4 lg:px-0 border-b lg:border-none", isLightTheme ? 'border-[#dbbee8]' : 'border-[#160b25]') }>
          <h2 className="text-2xl font-medium lg:font-bold font-zen-dot">
            Assets
          </h2>
          <TabList
            disabled={ !userLogined }
            tabs={ tabModule }
            value={ value }
            onSelect={ setValue }
          />
        </div>

        <div className="px-4 lg:px-0">
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
    </Layout>
  );
}
