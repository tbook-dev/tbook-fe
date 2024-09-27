import Empty from './Empty';
import useAssetQuery from '@/hooks/useAssetQuery';
import clsx from 'clsx';
import PageLoading from '@/components/pageFallback';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { C } from '../../../../dist/assets/verdor-558ff01f';

export default function NFT ({ isCompany = false }) {
  const { projectId, projectUrl, isUsingSubdomain, companyId, isLightTheme } = useLoaderData();
  const { data: assets, isLoading } = useAssetQuery(projectId, companyId, isCompany);
  const data = assets?.nfts || [];


  return (
    <div
      className={clsx(
        isLoading
          ? 'flex justify-center pt-10'
          : 'grid grid-cols-2 gap-2 lg:grid lg:grid-cols-5 lg:gap-4'
      )}
    >
      {isLoading ? (
        <PageLoading />
      ) : data.length > 0 ? (
        data.map((v) => {
          return (
            <Link
              to={`${isUsingSubdomain ? '' : `/${projectUrl}`}/nft/${
                v.groupId
              }/${v.nftId}`}
              className={ clsx("rounded-lg block overflow-hidden", isLightTheme ? 'bg-[#dbbee8]/60 ' : 'bg-[#0e0819] ')}
              key={v.nftId}
            >
              <img
                src={v.picUrl}
                alt="nft"
                className="w-full h-[187px] lg:h-[225px] rounded-t-lg object-contain flex-none"
              />
              <div className={ clsx("w-full h-px", isLightTheme ? 'bg-[#904bf6]' : 'bg-linear3')} />
              <div className="p-4">
                <h2 className="text-sm font-bold lg:text-xl lg:text-medium">
                  {v.name}
                </h2>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-2	lg:col-span-5 lg:h-[330px] lg:bg-[#0F081A] lg:rounded-xl flex justify-center items-center">
          <Empty text="There's no nfts yet." />
        </div>
      )}
    </div>
  );
}
