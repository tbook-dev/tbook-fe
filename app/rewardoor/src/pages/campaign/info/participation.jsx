import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCampaignParticipation } from "@/api/incentive";
import { useMemo } from "react";
import { conf } from "@tbook/utils";
import { incentiveAssetsTypeList } from "@/utils/conf";
const { formatDollar } = conf;

const mockParticipants = [
  {
    address: "0x1234567890",
    date: "16/05/2023",
    credential: [226665690620],
  },
  {
    address: "0x1234567890",
    date: "16/05/2023",
    credential: [],
  },
  {
    address: "0x1234567890",
    date: "16/05/2023",
    credential: [],
  },
];
export default function Participation() {
  const { id } = useParams();
  const { data: pageInfo = {} } = useQuery(
    ["participation", id],
    () => getCampaignParticipation(id),
    {
      staleTime: 60 * 1000 * 5,
    }
  );
  const participantConf = useMemo(() => {
    return [
      {
        title: "Participants",
        value: formatDollar(pageInfo.participantNum || 0),
      },
      {
        title: "GiveAway Credentials",
        value: formatDollar(pageInfo.credentialNum || 0),
      },
      {
        title: "GiveAway Points",
        value: formatDollar(pageInfo.pointNum || 0),
      },
      {
        title: "GiveAway NFTs",
        value: formatDollar(pageInfo.nftNum || 0),
      },
    ];
  }, [pageInfo]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-x-5">
        {participantConf.map((v, idx) => (
          <div key={idx} className="rounded-2.5xl bg-gray p-5">
            <div className="text-[20px] font-black text-t-1">{v.value}</div>
            <div className="text-sm font-medium text-c-9">{v.title}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray px-5 pt-5 pb-7 rounded-2.5xl">
        <h2 className="mb-4 text-base font-bold text-t-1">Reward</h2>
        <div className="flex items-center gap-x-5 gap-y-4 text-xs">
          {pageInfo?.nftList?.map((v, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-x-5 px-5 py-2 border border-[#666] rounded-2.5xl"
            >
              <div className="flex items-center gap-x-1 text-t-1">
                <div>
                  {incentiveAssetsTypeList.find((m) => m.value === 1)?.icon}
                </div>
                <div>{v.name}</div>
              </div>
              <div className="text-c-9">
                {formatDollar(v.giveNum)}/{formatDollar(v.num)}
              </div>
            </div>
          ))}
          {pageInfo?.pointList?.map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-x-5 px-5 py-2 border border-[#666] rounded-2.5xl"
            >
              <div className="flex items-center gap-x-1 text-t-1">
                <div>
                  {incentiveAssetsTypeList.find((m) => m.value === 2)?.icon}
                </div>
                <div>Points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray px-5 pt-5 pb-7 rounded-2.5xl">
        <h2 className="mb-4 text-base font-bold text-t-1">Credential</h2>
        <div className="flex items-center gap-x-5 gap-y-4 text-xs">
          {pageInfo?.credentialList?.map((v, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-x-5 px-5 py-2"
            >
              <div className="flex items-center gap-x-1">
                <img src={v.picUrl} className="w-5 h-5" />
                <div
                  className="text-t-1"
                  dangerouslySetInnerHTML={{ __html: v.display }}
                />
              </div>
              <div className="text-c-9 text-xs border border-[#666] rounded-2.5xl px-4 py-2">
                Giveaway: {formatDollar(v.giveAway)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray px-5 pt-5 pb-7 rounded-2.5xl">
        <h2 className="mb-4 text-base font-bold text-t-1">Participants</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th
                scope="col"
                align="left"
                className="pb-4 text-sm text-c-9 font-medium"
              >
                Wallet Address
              </th>
              {pageInfo?.pointList?.map((v, idx) => (
                <th
                  key={idx}
                  scope="col"
                  align="center"
                  className="pb-4 text-sm text-c-9 font-medium"
                >
                  Points
                </th>
              ))}
              {pageInfo?.credentialList?.map((v, idx) => (
                <th key={idx} align="center" className="pb-4">
                  <div className="inline-flex items-center justify-between gap-x-5 px-5 py-2">
                    <div className="flex items-center gap-x-1">
                      <img src={v.picUrl} className="w-5 h-5" />
                      <div
                        className="text-t-1 w-max"
                        dangerouslySetInnerHTML={{ __html: v.display }}
                      />
                    </div>
                  </div>
                </th>
              ))}
              <th
                scope="col"
                align="right"
                className="pb-4 text-sm text-c-9 font-medium"
              >
                Participation Date
              </th>
            </tr>
          </thead>
          <tbody>
            {mockParticipants.map((v, idx) => (
              <tr key={idx}>
                <td align="left" className="pb-4 text-sm text-t-1 font-medium">
                  {v.address}
                </td>
                {pageInfo?.pointList?.map((v, idx) => (
                  <td
                    key={idx}
                    scope="col"
                    align="center"
                    className="pb-4 text-sm text-c-9 font-medium"
                  >
                    +{formatDollar(v.number)}
                  </td>
                ))}
                {pageInfo?.credentialList?.map((v, idx) => (
                  <td key={idx} align="center" className="pb-4">
                    {v.isVerified === 0 ? "--" : "✓"}
                  </td>
                ))}
                <td align="right" className="text-sm text-t-1 font-medium">
                  {v.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
