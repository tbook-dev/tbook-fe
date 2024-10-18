import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCampaignParticipation } from '@/api/incentive';
import { useMemo } from 'react';
import { conf } from '@tbook/utils';
import { incentiveAssetsTypeList } from '@/utils/conf';
import { Pagination, Popover, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import copyIcon from '@/images/icon/copy.svg';
import { getParicipant } from '../conf';
import Loading from '@/components/loading';
import clsx from 'clsx';
import credentialsSVG from '@/images/campaign/credentials.svg';
import participantsSVG from '@/images/campaign/participants.svg';
import { Display } from '@tbook/credential';

const { Paragraph } = Typography;

const { formatDollarV2: formatDollar, shortAddress, timeFormat } = conf;

const pageSize = 10;

export default function Participation() {
  const [current, setCurrent] = useState(1);
  const { id } = useParams();
  const { data: pageInfo = {}, isLoading } = useQuery(
    ['participation', id],
    () => getCampaignParticipation(id),
    {
      staleTime: 60 * 1000 * 5,
    }
  );
  const participantConf = useMemo(() => {
    const [{ icon: nftIcon }, { icon: pointIcon }, { icon: sbtIcon }] =
      incentiveAssetsTypeList;
    const [participantNum, credentialNum, pointNum, nftNum, sbtNum] = [
      pageInfo.participantNum || 0,
      pageInfo.credentialNum || 0,
      pageInfo.pointNum || 0,
      pageInfo.nftNum || 0,
      pageInfo.sbtList?.length || 0,
    ];
    return [
      {
        title: participantNum > 1 ? 'Participants' : 'Participant',
        value: formatDollar(participantNum),
        cls: 'bg-[#904BF6]',
        picUrl: participantsSVG,
        isReward: false,
      },
      {
        title: credentialNum > 1 ? 'Credentials' : 'Credential',
        value: formatDollar(credentialNum),
        cls: 'bg-[#1A1A1A]',
        picUrl: credentialsSVG,
        isReward: false,
      },
      {
        title: pointNum > 1 ? 'Points' : 'Point',
        value: formatDollar(pointNum),
        cls: 'bg-[#006EE9]',
        picUrl: pointIcon,
        isReward: true,
      },
      {
        title: nftNum > 1 ? 'NFTs' : 'NFT',
        value: formatDollar(nftNum),
        cls: 'bg-[#CF0063]',
        picUrl: nftIcon,
        isReward: true,
      },
      {
        title: sbtNum > 1 ? 'SBTs' : 'SBT',
        value: formatDollar(sbtNum),
        cls: 'bg-[#F97319]',
        picUrl: sbtIcon,
        isReward: true,
      },
    ].filter((v) => (v.isReward ? v.value > 0 : true));
  }, [pageInfo]);
  if (isLoading) {
    return <Loading h="h-[300px]" />;
  }

  return (
    <div className="mb-10 space-y-5">
      <div className="flex items-center gap-x-5">
        {participantConf.map((v, idx) => (
          <div
            key={idx}
            className={clsx(
              'rounded-2.5xl text-white p-5 flex items-center justify-between w-[190px] flex-none',
              v.cls
            )}
          >
            <div>
              <div className="text-2xl font-zen-dot">{v.value}</div>
              <div className="text-sm">{v.title}</div>
            </div>

            <img src={v.picUrl} className="w-[72px] h-[72px]" />
          </div>
        ))}
      </div>

      <div className="bg-gray px-5 pt-5 pb-7 rounded-2.5xl">
        <h2 className="mb-4 text-base font-bold text-t-1">Reward</h2>
        <div className="flex items-center text-xs gap-x-5 gap-y-4">
          {pageInfo?.nftList?.map((v, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-x-5 px-5 py-2 border border-[#666] rounded-2.5xl"
            >
              <div className="flex items-center gap-x-1 text-t-1">
                <img src={v.picUrl} className="w-5 h-5" />
                <div>{v.name}</div>
              </div>
              <div className="text-c-9">
                {formatDollar(v.claimedCount)}/{formatDollar(v.mintCap)}
              </div>
            </div>
          ))}
          {pageInfo?.pointList?.slice(0, 1)?.map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-5 py-2 gap-x-5"
            >
              <div className="flex items-center gap-x-1 text-t-1">
                <img
                  src={incentiveAssetsTypeList.find((m) => m.value === 2)?.icon}
                  className="w-5 h-5"
                />

                <div>Points</div>
              </div>
            </div>
          ))}
          {pageInfo?.sbtList?.slice(0, 1)?.map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-x-5 px-5 py-2"
            >
              <div className="flex items-center gap-x-1 text-t-1">
                <img
                  src={incentiveAssetsTypeList.find((m) => m.value === 3)?.icon}
                  className="w-5 h-5"
                />

                <div>SBTs</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray px-5 pt-5 pb-7 rounded-2.5xl">
        <h2 className="mb-4 text-base font-bold text-t-1">Credential</h2>
        <div className="flex flex-wrap items-center text-xs gap-x-5 gap-y-4">
          {pageInfo?.credentialList?.map((v, idx) => {
            let options = {};
            try {
              options = JSON.parse(v.options);
            } catch (error) {
              console.log(
                'options not a json string, origin options is',
                v.options
              );
            }
            return (
              <div
                key={idx}
                className="flex items-center justify-between px-5 py-2 gap-x-5"
              >
                <div className="flex items-center gap-x-1">
                  <Display labelType={v.labelType} pc options={options} />
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
                              <img src={copyIcon} className="w-4 h-4" />,
                              <CheckOutlined style={{ color: '#3A82F7' }} />,
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
                <div className="text-c-9 text-xs border border-[#666] rounded-2.5xl px-4 py-2">
                  Giveaway: {formatDollar(v.giveAway)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray px-5 pt-5 pb-7 rounded-2.5xl">
        <h2 className="mb-4 text-base font-bold text-t-1">Participants</h2>
        <div className="relative overflow-x-auto">
          <table className="min-w-full table-fixed w-max">
            <thead>
              <tr>
                <th
                  scope="col"
                  align="left"
                  className="pb-4 text-sm font-medium text-c-9"
                >
                  Participants
                </th>
                {pageInfo?.nftList?.map((v, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    align="center"
                    className="pb-4 text-sm font-medium text-c-9"
                  >
                    <div className="inline-flex items-center justify-between px-5 py-2 gap-x-1">
                      <img src={v.picUrl} className="w-5 h-5" />
                      {v.name}
                    </div>
                  </th>
                ))}
                {pageInfo?.sbtList?.map((v, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    align="center"
                    className="pb-4 text-sm font-medium text-c-9"
                  >
                    <div className="inline-flex items-center justify-between px-5 py-2 gap-x-1">
                      <img src={v.picUrl} className="w-5 h-5" />
                      {v.name}
                    </div>
                  </th>
                ))}
                {pageInfo?.pointList?.length > 0 && (
                  <th
                    scope="col"
                    align="center"
                    className="pb-4 text-sm font-medium text-c-9"
                  >
                    Points
                  </th>
                )}
                {pageInfo?.credentialList?.map((v, idx) => {
                  let options = {};
                  try {
                    options = JSON.parse(v.options);
                  } catch (error) {
                    console.log(
                      'options not a json string, origin options is',
                      v.options
                    );
                  }
                  return (
                    <th key={idx} align="center" className="pb-4">
                      <div className="inline-flex px-5 py-2">
                        <Display labelType={v.labelType} pc options={options} />
                      </div>
                    </th>
                  );
                })}
                <th
                  scope="col"
                  align="right"
                  className="pb-4 text-sm font-medium text-c-9"
                >
                  Participation Date
                </th>
              </tr>
            </thead>
            <tbody>
              {pageInfo?.participantList?.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      pageInfo?.nftList?.length +
                      pageInfo?.sbtList?.length +
                      pageInfo?.pointList?.length +
                      pageInfo?.credentialList?.length +
                      2
                    }
                    className="py-2 text-center text-c-9"
                  >
                    No data
                  </td>
                </tr>
              ) : (
                pageInfo?.participantList
                  ?.slice((current - 1) * pageSize, current * pageSize)
                  .filter(
                    (item) => item.wallet || item.tgName || item.twitterName
                  )
                  .map((v, idx) => (
                    <tr key={idx}>
                      <td
                        align="left"
                        className="pb-4 text-sm font-medium text-t-1"
                      >
                        {getParicipant(v)}
                      </td>
                      {pageInfo?.nftList?.map((iv, idx) => (
                        <td key={idx} align="center" className="pb-4 text-base">
                          {v.nfts?.some((v) => v === iv.nftId) ? '✓' : '×'}
                        </td>
                      ))}
                      {pageInfo?.sbtList?.map((iv, idx) => (
                        <td key={idx} align="center" className="pb-4 text-base">
                          {v.sbts?.some((v) => v === iv.sbtId) ? '✓' : '×'}
                        </td>
                      ))}

                      {pageInfo?.pointList?.length > 0 && (
                        <td
                          key={idx}
                          scope="col"
                          align="center"
                          className="pb-4 text-base"
                        >
                          {v.points?.length > 0
                            ? `+${formatDollar(v.pointNum)}`
                            : '×'}
                        </td>
                      )}
                      {pageInfo?.credentialList?.map((iv, idx) => (
                        <td key={idx} align="center" className="pb-4 text-base">
                          {v?.verifiedCredentials?.some(
                            (m) => m.credentialId === iv.credentialId
                          )
                            ? '✓'
                            : '×'}
                        </td>
                      ))}
                      <td
                        align="right"
                        className="pb-4 text-sm font-medium text-t-1"
                      >
                        {dayjs(v.participantDate).format(timeFormat)}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <Pagination
            hideOnSinglePage
            responsive
            showSizeChanger={false}
            current={current}
            pageSize={pageSize}
            total={pageInfo?.participantList?.length}
            onChange={setCurrent}
          />
        </div>
      </div>
    </div>
  );
}
