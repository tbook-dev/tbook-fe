import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import { useLoaderData } from 'react-router-dom';
import useAssetQuery from '@/hooks/useAssetQuery';


import AssetTabList from './AssetTabList';
import PointRecord from '../my/modules/Point';
import { useCompanyOnboardQuery } from '@/hooks/useCompanyOnboardQuery';
import { useState } from 'react';
import { Skeleton } from 'antd';
import LightProvider from '@/theme/LightProvider';
import Credential from '@/pages/app/credential';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
export default function AssetPoints() {
  const { companyId, companyInfo }  = useLoaderData();
  const [tabValue, setTabValue] = useState('1');

  const userInfo = {
    point: 330000,
  };

  const { data: assets, isLoading: useScoreLoading } = useAssetQuery(null, companyId, true);
  const userTotalPoint = assets?.points?.reduce((acc, cur) => acc + cur.number, 0);
  
  const bgImage = 'https://static.tbook.vip/img/1a87d2e5bf3c498693f0c8ca64919797'

  const tabModule = [
    {
      name: 'Earn Your Build Points',
      value: '1',
      com: <OnBoardCampaign />,
    },
    {
      name: 'Points Records',
      value: '2',
      com: <PointRecord isCompany={ true } showTotalScore={ false } />,
    },
  ];

  return (
    <div>
      <div
        className="w-full h-[232px] relative"
        style={ { backgroundImage: `url(${companyInfo?.pointBgImage})` }}
      >
        <h1 className="absolute text-6xl font-bold bottom-6 left-10 font-zen-dot">
          {formatImpact(userInfo.point)}
        </h1>
      </div>

      <div className="p-6">
        <AssetTabList
          tabs={tabModule}
          value={tabValue}
          onSelect={setTabValue}
        />

        <div className="py-6">
          {tabModule.find((v) => v.value === tabValue).com}
        </div>
      </div>
    </div>
  );
}

function OnBoardCampaign() {
  const { companyId } = useParams();
  const { data, isLoading } = useCompanyOnboardQuery(companyId);
  const credentialList = useMemo(() => {
    return data?.data?.groups
      ?.map((v) => {
        return v.credentialList;
      })
      .flat();
  }, [data]);
  return (
    <div className="space-y-2.5">
      {isLoading ? (
        <LightProvider>
          {Array.from({ length: 2 })
            .fill(1)
            .map((_, index) => (
              <Skeleton key={index} />
            ))}
        </LightProvider>
      ) : (
        Array.isArray(credentialList) &&
        credentialList.map((v) => (
          <div className="bg-white rounded-lg" key={v.credentialId}>
            <Credential credential={v} theme="white" showVerify />
          </div>
        ))
      )}
    </div>
  );
}
