import clsx from 'clsx';
import { getCampaignDetail } from '@/api/incentive';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { campaignStatus } from '@/utils/conf';
import { useState } from 'react';
import { Spin } from 'antd';
import CampaignInfo from './info/campaign';
import ParticipationInfo from './info/participation';
import { useLayoutEffect } from 'react';
import Reward from './info/reward';
import Button from '@/components/button';
import { useCallback } from 'react';
import DeleteModal from './modal/delete';

const moduleMap = {
  0: <CampaignInfo />,
  1: <Reward />,
  2: <ParticipationInfo />,
};
const hasParticipationList = [1, 3, 4, 5];

export default function () {
  const { id } = useParams();
  const { data: pageInfo = {}, isLoading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    }
  );
  const [showDeleteModal, setDeteleModal] = useState(false);
  const [deletePenging, setDeletePending] = useState(false);
  const [selectStatus, setSelectedStatus] = useState(1);

  const tabList = useMemo(() => {
    const baseInfo = {
      label: 'Campaign Info',
      value: 0,
    };
    const participationInfo = [
      {
        label: 'Participation',
        value: 2,
      },
      {
        label: 'Reward',
        value: 1,
      },
    ];
    return hasParticipationList.includes(pageInfo.campaign?.status)
      ? [...participationInfo, baseInfo]
      : [baseInfo];
  }, [pageInfo]);
  const isInScheduleStatus = pageInfo?.campaign?.status === 2;
  const handleEdit = useCallback(() => {
    console.log('edit');
  }, []);
  const handleDelete = useCallback(() => {
    setDeteleModal(true);
  }, []);
  const handleHideDeleteModal = useCallback(() => {
    setDeteleModal(false);
  }, []);
  useLayoutEffect(() => {
    if (tabList.length === 1) {
      setSelectedStatus(0);
    } else {
      setSelectedStatus(2);
    }
  }, [tabList.length]);

  if (isLoading) {
    return <Spin />;
  }
  const campaignCurrentStatus = campaignStatus.find(
    v => v.value === pageInfo?.campaign?.status
  );

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/',
          },
          {
            title: pageInfo?.campaign?.name,
          },
        ]}
      />
      <section className='mb-10 pt-0.5 flex items-center gap-x-4'>
        <h2 className='font-bold text-5xl mb-0.5 text-t-1'>
          {pageInfo?.campaign?.name}
        </h2>
        <div
          className='px-4 py-0.5 rounded-xl border'
          style={{
            color: campaignCurrentStatus.color,
            borderColor: campaignCurrentStatus.color,
          }}
        >
          {campaignCurrentStatus?.label}
        </div>
      </section>

      <section>
        <div className='mb-8 flex gap-x-20'>
          {tabList.map(v => {
            return (
              <button
                key={v.value}
                className={clsx(
                  selectStatus === v.value
                    ? 'text-t-1 font-black relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white'
                    : 'text-t-2 font-bold',
                  'text-xl '
                )}
                onClick={() => {
                  setSelectedStatus(v.value);
                }}
              >
                {v.label}
              </button>
            );
          })}
        </div>
        {moduleMap[selectStatus]}
      </section>

      {isInScheduleStatus && (
        <>
          <DeleteModal open={showDeleteModal} onClose={handleHideDeleteModal} />

          <footer className='absolute inset-x-0 bg-black/20 bottom-0 h-20 flex items-center justify-end gap-x-10'>
            <Button onClick={handleDelete} isLoading={deletePenging}>
              Delete
            </Button>

            <Button type='primary' onClick={handleEdit}>
              Edit
            </Button>
          </footer>
        </>
      )}
    </>
  );
}
