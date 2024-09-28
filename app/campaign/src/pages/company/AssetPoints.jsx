import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import { useLoaderData } from 'react-router-dom';
import useAssetQuery from '@/hooks/useAssetQuery';


import AssetTabList from './AssetTabList';
import PointRecord from '../my/modules/Point';

import { useState } from 'react';

export default function AssetPoints() {
  const { companyId }  = useLoaderData();
  const [tabValue, setTabValue] = useState('1');

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
      <div className='w-full h-[232px] relative' style={ { backgroundImage: `url(${bgImage})` } }>
        <h1 className='absolute text-6xl font-bold bottom-6 left-10 font-zen-dot'>{ formatImpact(userTotalPoint) }</h1>
      </div>

      <div className='p-6'>
        <AssetTabList
          tabs={ tabModule }
          value={ tabValue }
          onSelect={ setTabValue }
        />

        <div className='py-6'>{ tabModule.find((v) => v.value === tabValue).com }</div>
      </div>
    </div>
  )
}

function OnBoardCampaign () {
  return (
    <div>on Board Campaign</div>
  )
}
