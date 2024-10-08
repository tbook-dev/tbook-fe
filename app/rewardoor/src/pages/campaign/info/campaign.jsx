import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCredentials } from '@/api/incentive';
import { incentiveAssetsTypeList, getUrl } from '@/utils/conf';
import useUserInfo from '@/hooks/queries/useUserInfo';
import dayjs from 'dayjs';
import Loading from '@/components/loading';
import useCampaign from '@/hooks/queries/useCampaign';
import { Display } from '@tbook/credential';
import { Typography, Popover } from 'antd';
import copyIcon from '@/images/icon/copy.svg';
import { CheckOutlined } from '@ant-design/icons';
import ShareLink from './shareLink';
import { getTMAShareLink, getTMALink } from '@/utils/conf';
import ArrowIcon from '@/images/icon/arrow.svg?react';

const dateFormat = `YYYY-MM-DD HH:mm:ss (UTCZ)`;
const { Paragraph } = Typography;

export default function Campaign() {
  const { id } = useParams();
  const { projectId, project } = useUserInfo();
  const { data: pageInfo = {}, isLoading } = useCampaign(id);
  const { data: credentialList = [] } = useQuery(
    ['credentialList', projectId],
    () => getCredentials(projectId),
    {
      enabled: !!projectId,
      staleTime: Infinity,
    }
  );
  // console.log({ pageInfo })
  const credentialSet = credentialList.map((v) => v.credentialList).flat();
  const link = `${getUrl()}/${encodeURIComponent(project.projectUrl)}/${id}`;
  const sbtList = pageInfo.groups.map((v) => v.sbtList).flat();
  const isSBT = sbtList.length > 0;
  const isUnderReview = pageInfo?.campaign?.status === 5;
  if (isLoading) {
    return <Loading h="h-[300px]" />;
  }
  return (
    <div className="mb-10 space-y-10">
      {!isUnderReview && (
        <div>
          <h2 className="mb-4 text-base font-bold text-t-1">
            Campaign Sharing
          </h2>
          <ShareLink
            shareLink={`${getUrl()}/${project?.projectUrl}/${id}`}
            TMALink={getTMALink({
              projectUrl: project?.projectUrl,
              campaignId: id,
            })}
            TMAshareLink={getTMAShareLink({
              projectUrl: project?.projectUrl,
              campaignId: id,
            })}
          />
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-base font-bold text-t-1">
          Credential Group & Reward
        </h2>
        <div className="space-y-3 bg-white/10 rounded-2.5xl p-3">
          {isSBT && (
            <div className="space-y-1">
              {sbtList.map((v) => {
                const list = [
                  {
                    label: 'Activity Id',
                    comp: v.activityId,
                    show: !!v.activityId,
                  },
                  {
                    label: 'Activity Url',
                    comp: (
                      <a
                        href={v.activityUrl}
                        className="flex items-center gap-x-0.5 underline"
                        target="_blank"
                      >
                        {v.activityUrl}
                        <ArrowIcon />
                      </a>
                    ),
                    show: !!v.activityUrl,
                  },
                ];
                return (
                  <div className="space-y-2">
                    {list
                      .filter((v) => v.show)
                      .map((v, idx) => {
                        return (
                          <div key={idx} className="flex items-center gap-x-4">
                            <span>{v.label}</span>
                            <span>{v.comp}</span>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          )}
          <div className="space-y-5 text-c-9">
            {pageInfo?.groups?.map((cr, index) => {
              return (
                <div
                  className="text-c-9 py-5 px-12 bg-gray rounded-2.5xl grid grid-cols-2 gap-x-10 relative before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-[1px] before:h-10 before:bg-c-6"
                  key={index}
                >
                  <div className="flex items-center w-full">
                    <div className="space-y-6 w-max">
                      {cr.credentialList.map((v, idx) => {
                        let options = {};
                        try {
                          options = JSON.parse(v.options);
                        } catch (error) {
                          options = {};
                        }
                        return (
                          <div
                            key={idx}
                            className="flex gap-x-2.5 items-center"
                          >
                            <Display
                              key={idx}
                              pc
                              labelType={v.labelType}
                              options={options}
                            />
                            <Popover
                              content={
                                <div className="text-sm text-[#FCFCFC] space-y-1">
                                  <p>Credential ID</p>
                                  <Paragraph
                                    style={{ marginBottom: 0 }}
                                    className="flex items-center justify-center"
                                    copyable={{
                                      text: v.credentialId,
                                      icon: [
                                        <img
                                          src={copyIcon}
                                          className="w-4 h-4"
                                        />,
                                        <CheckOutlined
                                          style={{ color: '#3A82F7' }}
                                        />,
                                      ],
                                    }}
                                  >
                                    {v.credentialId}
                                  </Paragraph>
                                </div>
                              }
                            >
                              <span className="text-xs inline-block p-1 bg-[#1a1a1a] rounded-sm cursor-pointer">
                                ID
                              </span>
                            </Popover>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-full space-y-6">
                      <div className="space-y-6">
                        {cr.nftList.map((v, idx) => {
                          const m = incentiveAssetsTypeList.find(
                            (i) => i.value === 1
                          );
                          return (
                            <div
                              key={idx}
                              className="px-6 py-2 text-xs font-medium text-c-9 border border-c-6 rounded-2.5xl flex justify-between items-center"
                            >
                              <div className="flex items-center gap-x-2">
                                <img src={m?.icon} className="w-5 h-5" />
                                {m?.text}
                              </div>
                              <span>{v.name}</span>
                            </div>
                          );
                        })}
                        {cr.pointList.map((v, idx) => {
                          const m = incentiveAssetsTypeList.find(
                            (i) => i.value === 2
                          );
                          return (
                            <div
                              key={idx}
                              className="px-6 py-2 text-xs font-medium text-c-9 border border-c-6 rounded-2.5xl flex justify-between items-center"
                            >
                              <div className="flex items-center gap-x-2">
                                <img src={m?.icon} className="w-5 h-5" />
                                {m?.text}
                              </div>
                              <span>{v.number}</span>
                            </div>
                          );
                        })}
                        {cr.sbtList.map((v, idx) => {
                          const m = incentiveAssetsTypeList.find(
                            (i) => i.value === 3
                          );
                          return (
                            <div
                              key={idx}
                              className="px-6 py-2 text-xs font-medium text-c-9 border border-c-6 rounded-2.5xl flex justify-between items-center"
                            >
                              <div className="flex items-center gap-x-2">
                                <img src={m?.icon} className="w-5 h-5" />
                                {m?.text}
                              </div>
                              <span>{v.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-base font-bold text-t-1">Campaign Schedule</h2>
        <div className="text-base font-medium text-c-9">
          {`${dayjs(pageInfo?.campaign?.startAt).format(dateFormat)}-${dayjs(
            pageInfo?.campaign?.endAt
          ).format(dateFormat)}`}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-base font-bold text-t-1">
          Campaign Description
        </h2>
        <div
          className="text-base font-medium text-c-9"
          dangerouslySetInnerHTML={{ __html: pageInfo?.campaign?.description }}
        />
      </div>
    </div>
  );
}
