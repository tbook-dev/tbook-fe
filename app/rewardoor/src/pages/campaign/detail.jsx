import clsx from 'clsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { campaignStatus } from '@/utils/conf';
import { useState } from 'react';
import { Spin, notification } from 'antd';
import CampaignInfo from './info/campaign';
import ParticipationInfo from './info/participation';
import { useLayoutEffect } from 'react';
import Reward from './info/reward';
import Button from '@/components/button';
import { useCallback } from 'react';
import DeleteModal from './modal/delete';
import useCampaign from '@/hooks/queries/useCampaign';
import { deleteCampaign } from '@/api/incentive';
import useCampaignList from '@/hooks/queries/useCampaignList';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { useQueryClient } from 'react-query';

const moduleMap = {
  0: <CampaignInfo />,
  1: <Reward />,
  2: <ParticipationInfo />,
};
const hasParticipationList = [1, 3, 4, 5];
const errorMsg = 'An error hanppens, please try it later!';
const deleteMsg = 'Delete sucess!';

export default function () {
  const { projectId } = useUserInfo();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const { data: pageInfo = {}, isLoading } = useCampaign(id);
  const { refetch: getCampaignList } = useCampaignList();
  const queryClient = useQueryClient();
  const [showDeleteModal, setDeteleModal] = useState(false);
  const [deletePenging, setDeletePending] = useState(false);
  const [selectStatus, setSelectedStatus] = useState(1);
  const navigate = useNavigate();
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
  // const isInScheduleStatus = true;
  const isInScheduleStatus = pageInfo?.campaign?.status === 2;
  const handleEdit = useCallback(() => {
    navigate(`/campaign/${id}/update`);
  }, [id]);
  const handleDelete = useCallback(() => {
    setDeteleModal(true);
  }, []);
  const handleDelelteConfirm = async () => {
    setDeletePending(true);
    try {
      const res = await deleteCampaign(id);
      // op mutation
      queryClient.setQueryData(['campaignList', projectId], (old) => {
        const newData = old?.filter((v) => v.campaign?.campaignId != id);
        return newData;
      });
      getCampaignList();
      api.success({
        message: res.message ?? deleteMsg,
      });
      navigate(`/`);
    } catch (e) {
      api.error({ message: e.message ?? errorMsg });
    }
    setDeletePending(false);
  };
  const handleHideDeleteModal = useCallback(() => {
    // if (deletePenging) return;
    setDeteleModal(false);
    setDeletePending(false);
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
    (v) => v.value === pageInfo?.campaign?.status
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
      <section className="mb-10 pt-0.5 flex items-center gap-x-4">
        <h2 className="font-bold text-5xl mb-0.5 text-t-1">
          {pageInfo?.campaign?.name}
        </h2>
        <div
          className="px-4 py-0.5 rounded-xl border"
          style={{
            color: campaignCurrentStatus?.color,
            borderColor: campaignCurrentStatus?.color,
          }}
        >
          {campaignCurrentStatus?.label}
        </div>
      </section>

      <section className={isInScheduleStatus ? 'mb-36' : ''}>
        <div className="mb-8 flex gap-x-20">
          {tabList.map((v) => {
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
          <DeleteModal
            open={showDeleteModal}
            onClose={handleHideDeleteModal}
            loading={deletePenging}
            onConfirm={handleDelelteConfirm}
          />

          <footer className="fixed bottom-0 inset-x-0 pl-[280px]">
            <div className="w-[1080px] mx-auto h-20 flex items-center justify-end gap-x-10 relative before:-z-10 before:absolute before:inset-0 before:bg-black/20 before:blur before:backdrop-blur">
              <Button onClick={handleDelete} loading={deletePenging}>
                Delete
              </Button>

              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
            </div>
          </footer>
        </>
      )}
      {contextHolder}
    </>
  );
}
