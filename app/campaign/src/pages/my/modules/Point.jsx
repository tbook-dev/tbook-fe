import { formatStandard } from '@tbook/utils/lib/conf';
import useAssetQuery from '@/hooks/useAssetQuery';
import PageLoading from '@/components/pageFallback';

import _ from 'lodash';
import { useLoaderData, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import pointIcon from '@/images/icon/point.svg';
import arrow3Icon from '@/images/icon/arrow2.svg';

export default function Point ({ isCompany = false }) {
  const { projectId, projectUrl, isUsingSubdomain, companyId } = useLoaderData();
  const { data: assets, isLoading } = useAssetQuery(projectId, companyId, isCompany);
  const data = assets?.points || [];
  const total = _.sum(data.map((v) => v.number));

  return (
    <div className="space-y-2">
      {isLoading ? (
        <div className="flex justify-center pt-10">
          <PageLoading />
        </div>
      ) : (
        <>
            <div className="flex items-center justify-between p-5 rounded-lg bg-[#0e0819] border border-[#904BF6] mb-8 text-white">
            <div className="space-y-2 lg:space-y-4">
              <div className="text-sm lg:text-lg">points</div>
              <div className="font-bold text-4.2xl leading-[44px] mb-1 lg:text-[48px] lg:font-medium font-zen-dot">
                {formatStandard(total)}
              </div>
            </div>
            <img
              src={pointIcon}
              className="w-20 h-20 lg:w-[120px] lg:h-[120px]"
            />
          </div>
          <div className="space-y-2">
            {data.map((v, idx) => {
              return (
                <div
                  key={idx}
                  className="p-5 bg-[#0e0819] rounded-lg flex justify-between items-center"
                >
                  <div className="w-[250px] lg:w-[1000px] flex flex-col text-white">
                    <Link
                      className="text-sm font-medium"
                      to={`${isUsingSubdomain ? '' : `/${projectUrl}`}/${
                        v.campaignId
                      }`}
                    >
                      {v.campaignName}
                      <img
                        src={arrow3Icon}
                        alt="arrow"
                        className="inline-block ml-0.5 w-4 h-4 object-contain"
                      />
                    </Link>
                    <span className="text-xs text-[#C0ABD9]">
                      {dayjs(v.claimedDate).format('MMMM DD, YYYY')}
                    </span>
                  </div>
                  <div className="text-base font-medium text-white">
                    +{formatStandard(v.number)}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
