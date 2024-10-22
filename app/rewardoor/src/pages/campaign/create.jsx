import { Form, message } from 'antd';
import Breadcrumb from '@/components/breadcrumb';
import { useRef, useState, useEffect } from 'react';
import Button from '@/components/button';
import { useNavigate, useParams } from 'react-router-dom';
import { createCampaign, updateCampaign } from '@/api/incentive';
// import { useQueryClient } from 'react-query';
import CredentialReward from './modules/CredentialReward';
import dayjs from 'dayjs';
import { conf } from '@tbook/utils';
import BasicInfo from './modules/BasicInfo';
import { defaultCredentialReward } from './conf';
import useUserInfo from '@/hooks/queries/useUserInfo';
import SucessModal from './modules/SucessModal';
import { get } from 'lodash';
import { getUrl } from '@/utils/conf';
import useNFTcontract from '@/hooks/queries/useNFTcontract';
// import useCredential from '@/hooks/queries/useCredential';
import useCampaign, {
  useSyncTONSocietyMutation,
} from '@/hooks/queries/useCampaign';
import Loading from '@/components/loading';
import useCampaignList from '@/hooks/queries/useCampaignList';
import credentialMap from '@/components/credential/form';
import { pick } from 'lodash';
import { getTMAShareLink, getTMALink } from '@/utils/conf';
import { credential as credentialListData } from '@tbook/credential';

const title = 'Set up an Incentive Campaign';
const textMap = {
  1: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Basic Info',
    back: 'Cancel',
    next: 'Next',
  },
  2: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Credential',
    back: 'Previous',
    next: 'Release',
  },
};
const { defaultErrorMsg } = conf;
const defaultStep = '2';

const checkFormValidte = (conf) => {
  return (
    conf &&
    conf?.every((v) => {
      return v?.credential?.length > 0 && v?.reward?.length > 0;
    })
  );
};

export default function () {
  const [messageApi, contextHolder] = message.useMessage();
  const { refetch: getCampaignList } = useCampaignList();

  const [step, setStep] = useState(defaultStep);
  const [confirmCreateLoading, setConfirmCreateLoading] = useState(false);
  const { projectId, project } = useUserInfo();
  const [sucessData, setSucessData] = useState(false);
  const { data: NFTcontracts = [] } = useNFTcontract();
  // const { data: credentialList = [] } = useCredential();
  const [credentialReward, setCredentialReward] = useState([
    { ...defaultCredentialReward },
  ]);
  const syncTONSocietyMutation = useSyncTONSocietyMutation();
  const [setupSubmittable, setSetUpSubmittable] = useState(false);
  const [setUpForm] = Form.useForm();
  const { id: campaignId } = useParams();
  const fd = useRef({});
  const navigate = useNavigate();
  const editMode = !!campaignId;
  const {
    data: pageInfo = {},
    refetch: getCompaignDetail,
    isLoading: isCampaignLoading,
  } = useCampaign(campaignId);
  const isInOngoingStatus = pageInfo?.campaign?.status === 1;
  const handleStepUp = async () => {
    const values = await setUpForm.validateFields();
    fd.current = {
      title: values.title,
      picUrl: values.picUrl?.[0]?.response,
      description: values.description,
      startAt: dayjs(values.schedule[0]).valueOf(),
      endAt: dayjs(values.schedule[1]).valueOf(),
      projectId,
      status: 0,
    };
    if (editMode) {
      const remoteCredentialReward = pageInfo.groups.map((v) => {
        const reward = [];
        if (Array.isArray(v.pointList) && v.pointList.length > 0) {
          //////////// point type
          reward.push(
            ...v.pointList.map((p) => ({
              ...p,
              rewardType: 2,
              limited: !p.unlimited,
            }))
          );
        }
        if (Array.isArray(v.nftList) && v.nftList.length > 0) {
          //////////// nft type
          reward.push(
            ...v.nftList.map((p) => ({
              ...p,
              rewardType: 1,
              limited: !p.unlimited,
              picUrl: [
                {
                  uid: '-1',
                  status: 'done',
                  url: p.picUrl,
                  response: p.picUrl,
                },
              ],
            }))
          );
        }
        if (
          Array.isArray(v.sbtList) &&
          v.sbtList.length > 0 &&
          v.sbtCollection
        ) {
          //////////// sbt type
          reward.push(
            ...v.sbtList.map((p) => ({
              ...p,
              rewardType: 3,
              methodType: 1,
              limited: false,
              // sbtItemTitle: p.name,
              sbtImage: [
                {
                  uid: '-1',
                  status: 'done',
                  url: p.picUrl,
                  response: p.picUrl,
                },
              ],
              subTitle: v.sbtCollection.subtitle,
              buttonLabel: v.sbtCollection.buttonLabel,
              // buttonLink: v.buttonLink,
              sbtCollectionTitle: v.sbtCollection.sbtCollectionTitle,
              sbtCollectionDesc: v.sbtCollection.sbtCollectionDesc,
              sbtItemTitle: v.sbtCollection.sbtItemTitle,
              sbtDesc: v.sbtCollection.sbtDesc,
              sbtVideo: v.sbtCollection.sbtVideo
                ? [
                    {
                      uid: '-1',
                      status: 'done',
                      url: p.picUrl,
                      response: p.picUrl,
                    },
                  ]
                : null,
            }))
          );
        }

        return {
          credential: v.credentialList.map((c) => {
            let options = {};
            try {
              options = JSON.parse(c.options);
            } catch (error) {
              console.log(error);
            }
            // 原始数据
            const fieldData = pick(options, credentialMap[c.lableType]?.pick);
            return {
              ...c,
              ...fieldData,
              options,
            };
          }),
          reward: reward,
        };
      });
      // console.log({ remoteCredentialReward });
      setCredentialReward(remoteCredentialReward);
    }
    // console.log({ credentialReward, pageInfo });
    setStep('2');
  };
  const handleCreate = async () => {
    // 一个是表单的内容，一个是credentialReward的内容
    // fd.current = {
    //   title: 'tbook 666',
    //   picUrl:
    //     'https://rd-worker.xgamma.workers.dev/img/c761d3f0ac734a398999636e2e516512',
    //   description: 'abc is abc',
    //   startAt: 1691570370705,
    //   endAt: 1695112770705,
    //   projectId: 153900040006,
    //   status: 0
    // }
    setConfirmCreateLoading(true);
    // console.log({ credentialReward });
    const sbtSyncArrays = [];
    const data = {
      campaign: fd.current,
      groups: credentialReward.map((v) => {
        const credentialList = v.credential.map((c) => {
          return {
            ...c,
            options: JSON.stringify(c.options),
          };
        });
        const pointList = v.reward
          .filter((v) => v.rewardType === 2)
          .map((v) => ({ ...v, unlimited: !v.limited }));
        const nftList = v.reward
          .filter((v) => v.rewardType === 1)
          .map((v) => ({ ...v, picUrl: v.picUrl?.[0]?.response }))
          .map((v) => {
            const nft = NFTcontracts.find((n) => n.nftId === v.nftId);
            return {
              ...v,
              chainId: nft.chainId,
              contract: nft.contract,
              creatorId: nft.creatorId,
              unlimited: !v.limited,
            };
          });
        const sbtList = v.reward
          .filter((v) => v.rewardType === 3)
          .map((v) => {
            sbtSyncArrays.push({
              subtitle: v.subTitle,
              buttonLabel: v.buttonLabel,
              // buttonLink: v.buttonLink,
              sbtCollectionTitle: v.sbtCollectionTitle,
              sbtCollectionDesc: v.sbtCollectionDesc,
              sbtItemTitle: v.sbtItemTitle,
              sbtDesc: v.sbtDesc,
              sbtImage: v.sbtImage?.[0]?.response,
              sbtVideo: v.sbtVideo?.[0]?.response ?? '',
            });
            return {
              ...v,
              name: v.sbtItemTitle,
              picUrl: v.sbtImage?.[0]?.response,
              methodType: 1,
              unlimited: true,
            };
          });
        if (
          sbtList.length > 0 &&
          !credentialList.find((c) => c.labelType === 23)
        ) {
          const tonCredential = credentialListData.find(
            (c) => c.labelType === 23
          );
          credentialList.push({
            ...tonCredential,
            options: JSON.stringify({
              sbtAutoInject: true,
              ...pick(tonCredential, credentialMap[23]?.pick),
            }),
          });
        }

        const fdata = {
          status: 1,
          projectId,
          credentialList,
          pointList,
          nftList,
          sbtList,
          groupType: credentialList[0]?.groupType,
          name: credentialList[0]?.name,
        };
        if (editMode) {
          const c = credentialList.find((v) => !!v.groupId);
          if (c) {
            fdata.id = c.groupId;
          } else {
            fdata.id = 0;
          }
        }
        return fdata;
      }),
    };
    console.log(credentialReward, data);

    try {
      const res = editMode
        ? await updateCampaign({
            ...data,
            campaign: {
              ...data.campaign,
              campaignId,
            },
          })
        : await createCampaign(data);
      if (sbtSyncArrays.length > 0 && !editMode) {
        // sync to ton society
        const tonData = {
          // campaign info
          projectId: res.campaign.projectId,
          campaignId: res.campaign.campaignId,
          title: res.campaign.title,
          description: res.campaign.description,
          startDate: res.campaign.startAt,
          endDate: res.campaign.endAt,
          // sbt info
          buttonLink: getTMALink({
            campaignId: res.campaign.campaignId,
            projectUrl: project.projectUrl,
          }),
        };
        const remoteSBTIds = res?.groups
          .map((v) => {
            return v.sbtList.map((sbt) => ({ ...sbt, groupId: v.id }));
          })
          .flat();
        for (let i = 0; i < sbtSyncArrays.length; i++) {
          const sbt = sbtSyncArrays[i];
          const { sbtId, groupId } = remoteSBTIds[i];
          console.log({ res, sbt, tonData, remoteSBTIds, sbtSyncArrays });
          await syncTONSocietyMutation.mutateAsync({
            ...tonData,
            ...sbt,
            sbtId,
            groupId,
          });
        }
      }
      if (editMode) {
        await getCompaignDetail();
      } else {
        await getCampaignList();
      }
      setConfirmCreateLoading(false);
      // navigate(listLink)
      setSucessData(res);
    } catch (error) {
      setConfirmCreateLoading(false);
      messageApi.error(error?.msg || defaultErrorMsg);
      console.log(error);
    }
  };

  const setUpFormValues = Form.useWatch([], setUpForm);
  // const getTMAShareLink = ({ campaignId, projectUrl }) => {
  //   const link = `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}?startapp=${btoa(
  //     JSON.stringify({ projectUrl, campaignId, type: 'campaign' })
  //   )}`;
  //   return `https://t.me/share/url?url=${encodeURIComponent(link)}`;
  // };
  const validateBasicFormFields = () => {
    setUpForm.validateFields({ validateOnly: true }).then(
      () => {
        setSetUpSubmittable(true);
      },
      () => {
        setSetUpSubmittable(false);
      }
    );
  };
  useEffect(() => {
    validateBasicFormFields();
  }, [setUpFormValues]);

  useEffect(() => {
    if (editMode && !isCampaignLoading) {
      setUpForm.setFieldsValue({
        title: pageInfo?.campaign?.title,
        picUrl: [
          {
            uid: '-1',
            status: 'done',
            url: pageInfo?.campaign?.picUrl,
            response: pageInfo?.campaign?.picUrl,
          },
        ],
        description: pageInfo?.campaign?.description,
        schedule: [
          dayjs(pageInfo?.campaign?.startAt),
          dayjs(pageInfo?.campaign?.endAt),
        ],
      });
    }
  }, [editMode, isCampaignLoading]);

  if (editMode && isCampaignLoading) {
    return <Loading />;
  }

  return (
    <div className="text-white relative min-h-full">
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/',
          },
          {
            title: 'Set up an incentive campaign',
          },
        ]}
      />

      <div className="pt-1 mb-40">
        <h1 className="text-4xl  mb-10 font-bold">{title}</h1>
        <div className="relative">
          {step === '1' && (
            <BasicInfo
              form={setUpForm}
              isInOngoingEdit={isInOngoingStatus && editMode}
            />
          )}
          {step === '2' && (
            <CredentialReward
              credentialReward={credentialReward}
              setCredentialReward={setCredentialReward}
              NFTcontracts={NFTcontracts}
              // credentialList={credentialList}
              isInOngoingEdit={isInOngoingStatus && editMode}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 pl-[280px] flex">
        <div className="flex justify-end items-center w-[1080px] h-20 mx-auto relative before:-z-10 before:absolute before:inset-0 before:bg-black/20 before:blur before:backdrop-blur">
          <div className="flex justify-center space-x-6">
            {step === '1' && (
              <>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {textMap[1]?.back}
                </Button>

                <Button
                  type="primary"
                  onClick={handleStepUp}
                  disabled={!setupSubmittable}
                >
                  {textMap[1]['next']}
                </Button>
              </>
            )}

            {step === '2' && (
              <>
                <Button
                  onClick={() => {
                    setStep('1');
                  }}
                >
                  {textMap[2]?.back}
                </Button>
                <Button
                  type="primary"
                  onClick={handleCreate}
                  loading={confirmCreateLoading}
                  disabled={!checkFormValidte(credentialReward)}
                >
                  {textMap[2]['next']}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <SucessModal
        open={!!sucessData}
        setOpen={setSucessData}
        shareLink={`${getUrl()}/${project?.projectUrl}/${get(
          sucessData,
          'campaign.campaignId'
        )}`}
        TMALink={getTMALink({
          projectUrl: project?.projectUrl,
          campaignId: get(sucessData, 'campaign.campaignId'),
        })}
        TMAshareLink={getTMAShareLink({
          projectUrl: project?.projectUrl,
          campaignId: get(sucessData, 'campaign.campaignId'),
        })}
        jumpLink={`/campaign/${get(sucessData, 'campaign.campaignId')}/detail`}
        hideShare={get(sucessData, 'groups')?.some(
          (v) => v.sbtList?.length > 0
        )}
      />
      {contextHolder}
    </div>
  );
}
