import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import { useLoaderData } from 'react-router-dom';
import useAssetQuery from '@/hooks/useAssetQuery';
import { useQueryClient } from 'react-query';
import useUserInfo from '@/hooks/useUserInfoQuery';
import AssetTabList from './AssetTabList';
import PointRecord from '../my/modules/Point';
import { useCompanyOnboardQuery } from '@/hooks/useCompanyOnboardQuery';
import { useState } from 'react';
import { Skeleton } from 'antd';
import LightProvider from '@/theme/LightProvider';
import Credential from '@/pages/app/credential';
import { useParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
export default function AssetPoints() {
  const { companyId, companyInfo }  = useLoaderData();
  const [tabValue, setTabValue] = useState('1');

  const { data: assets, isLoading: useScoreLoading } = useAssetQuery(null, companyId, true);
  const userTotalPoint = assets?.points?.reduce((acc, cur) => acc + cur.number, 0);


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
        className="w-full h-[232px] relative">
        <img width="w-screen h-[232px] absolute" src={ companyInfo?.pointBgImage } alt="point image" />
        <h1 className="absolute text-6xl font-bold bottom-6 left-10 font-zen-dot">
          {formatImpact(userTotalPoint)}
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
  const queryClient = useQueryClient();
  const { companyId } = useParams();
  const { userLogined } = useUserInfo();
  const { data, isLoading } = useCompanyOnboardQuery(companyId);
  const credentialList = useMemo(() => {
    return data?.data?.groups
      ?.map((v) => {
        return v.credentialList;
      })
      .flat();
  }, [data]);

  const handleVerifySuccess = useCallback(async (credentialId) => {
    setTimeout(async () => {
      await queryClient.invalidateQueries([ 'asset-company', companyId, userLogined ]);
    }, 1000);
  }, [ queryClient, companyId ]);

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
            <Credential 
              credential={v}
              theme="white"
              showVerify
              onVerifySuccess={ handleVerifySuccess }
            />
          </div>
        ))
      )}
    </div>
  );
}
