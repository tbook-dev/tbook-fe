import clsx from 'clsx';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { campaignStatus } from '@/utils/conf';
import { useState } from 'react';
import { Spin, notification, Popover } from 'antd';
import CampaignInfo from './info/campaign';
import ParticipationInfo from './info/participation';
import { useLayoutEffect } from 'react';
import Reward from './info/reward';
import Button from '@/components/button';
import { useCallback } from 'react';
import DeleteModal from './modal/delete';
import useCampaign, { useTonPrivilege } from '@/hooks/queries/useCampaign';
import { deleteCampaign } from '@/api/incentive';
import useCampaignList from '@/hooks/queries/useCampaignList';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { useQueryClient } from 'react-query';
import TonSocietyIcon from '@/images/icon/ton-society.svg';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TonSocietyGuideLine } from './ton-society';

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
  const { data: tonPrivilege } = useTonPrivilege(id);
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
  const isInOngoingStatus = pageInfo?.campaign?.status === 1;

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
  const { hasPrivilegeSyncTon, showEdit, showDelete, showSyncTon } =
    useMemo(() => {
      return {
        showSyncTon:
          tonPrivilege?.hasPrivilege &&
          !tonPrivilege?.synced &&
          (isInOngoingStatus || isInScheduleStatus),
        hasPrivilegeSyncTon: tonPrivilege?.hasPrivilege,
        showEdit: isInOngoingStatus || isInScheduleStatus,
        showDelete: isInScheduleStatus,
      };
    }, [isInScheduleStatus, isInOngoingStatus, pageInfo, tonPrivilege]);
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
        <h2 className="font-bold text-5xl mb-0.5 text-white">
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

      <section className="mb-36">
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

      <DeleteModal
        open={showDeleteModal}
        onClose={handleHideDeleteModal}
        loading={deletePenging}
        onConfirm={handleDelelteConfirm}
      />

      <footer className="fixed bottom-0 inset-x-0 pl-[280px] flex">
        <div
          className={clsx(
            'w-[1080px] mx-auto h-20 flex items-center gap-x-10 backdrop-blur',
            hasPrivilegeSyncTon ? 'justify-between' : 'justify-end '
          )}
        >
          {hasPrivilegeSyncTon &&
            (showSyncTon ? (
              <Link to={`/campaign/${id}/sync-ton-society`}>
                <Button className="text-white flex">
                  <span className="flex me-2">
                    <img
                      src={TonSocietyIcon}
                      alt="ton society"
                      className="mx-1"
                    />
                    Sync to
                  </span>

                  <TonSocietyGuideLine className="cursor-pointer" />
                </Button>
              </Link>
            ) : (
              <Button className="text-white flex" disabled>
                <Popover
                  placement="top"
                  content={
                    <div className="text-sm w-[320px]">
                      You have submitted a sync application. Once approved, you
                      can view the results on the TON Society page:
                      <a
                        className="text-[#904BF6] hover:text-[#904BF6] ms-1 hover:underline hover:underline-offset-2"
                        target="_blank"
                        href="https://society.ton.org"
                      >
                        https://society.ton.org
                      </a>
                    </div>
                  }
                >
                  <span className="flex me-2">
                    <img
                      src={TonSocietyIcon}
                      alt="ton society"
                      className="mx-1"
                    />
                    Sync to
                  </span>
                </Popover>

                <TonSocietyGuideLine />
              </Button>
            ))}
          <div className="flex justify-between items-center gap-x-10">
            {showDelete && (
              <Button onClick={handleDelete} loading={deletePenging}>
                Delete
              </Button>
            )}

            {showEdit && (
              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>
        </div>
      </footer>
      {contextHolder}
    </>
  );
}
