import { useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { Spin } from "antd";
import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import CampaignMyCard from "@/components/campain/campaignMyCard";
import TabList from "./TabList";
import { useState } from "react";

const data = [
  {
    campaignId: 251853830544,
    title: "web3 sovereign identity onboarding",
    name: "web3 sovereign identity onboarding",
    picUrl:
      "https://rd-worker.xgamma.workers.dev/img/f10961f992ab456a99539b677a023393",
    description:
      "Next.ID is an open-sourced protocol that synergises your Web2 and Web3 profiles. Next.ID connects and authenticates your digital footprints, all while giving you full ownership of your identities.",
    status: 1,
    campaignCategory: 2,
    project: {
      projectId: 251843220543,
      projectName: "Next.ID",
      projectUrl: "Next.ID",
      avatarUrl:
        "https://rd-worker.xgamma.workers.dev/img/440d23db17ad4c63bd9d30504af4a11a",
      tags: ["Infra"],
      projectDescription: "",
      websiteUrl: "",
      telegramUrl: "",
    },
    users: [
      {
        userId: 247362450036,
        wallet: "0x3B566ca18c3604c4fca9Ee068a1e3378A0de5538",
        avatar:
          "https://api.dicebear.com/7.x/fun-emoji/svg?backgroundColor=b6e3f4,c0aede,d1d4f9,f6d594,fcbc34,ffd5dc,ffdfbf&backgroundType=gradientLinear&eyes=closed,closed2&mouth=lilSmile,wideSmile&seed=0x3B566ca18c3604c4fca9Ee068a1e3378A0de5538",
        email: "",
        name: "",
        projects: [],
      },
      {
        userId: 251916720570,
        wallet: "0x56Abd0d1be03B3Bf42A05DbDda0e92B75a0dd872",
        avatar:
          "https://api.dicebear.com/7.x/fun-emoji/svg?backgroundColor=b6e3f4,c0aede,d1d4f9,f6d594,fcbc34,ffd5dc,ffdfbf&backgroundType=gradientLinear&eyes=closed,closed2&mouth=lilSmile,wideSmile&seed=0x56Abd0d1be03B3Bf42A05DbDda0e92B75a0dd872",
        email: "",
        name: "",
        projects: [],
      },
    ],
    points: [
      {
        pointId: 251853830548,
        number: 2,
        methodType: 2,
        unlimited: true,
        rewardNum: 10,
        projectId: 251843220543,
        creatorId: 0,
        groupId: 251853830545,
        claimedType: 0,
        claimedDate: null,
      },
      {
        pointId: 251853830551,
        number: 2,
        methodType: 3,
        unlimited: true,
        rewardNum: 10,
        projectId: 251843220543,
        creatorId: 0,
        groupId: 251853830549,
        claimedType: 0,
        claimedDate: null,
      },
      {
        pointId: 251853830554,
        number: 5,
        methodType: 2,
        unlimited: true,
        rewardNum: 10,
        projectId: 251843220543,
        creatorId: 0,
        groupId: 251853830552,
        claimedType: 0,
        claimedDate: null,
      },
    ],
    nfts: [],
    tokens: [],
  },
];
const tabModule = [
  {
    name: "Claimable",
    value: 1,
  },
  {
    name: "Probable",
    value: 2,
  },
  {
    name: "Completed",
    value: 3,
  },
];
export default function Campaign() {
  const { projectId } = useParams();
  const { firstLoad } = useUserInfoQuery();
  const [value, setValue] = useState(tabModule[0].value);

  if (!firstLoad) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spin spinning />
      </div>
    );
  }
  return (
    <div className="space-y-10 w-page-content px-2 lg:px-0 mx-auto">
      <PersonalInfo />
      <TabList
        disabled={false}
        value={value}
        onSelect={setValue}
        tabs={tabModule}
      />
      <div className="space-y-3">
        {data.map((v) => {
          return (
            <CampaignMyCard key={v.campaignId} projectId={projectId} {...v} />
          );
        })}
      </div>
    </div>
  );
}
