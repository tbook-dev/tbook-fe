import { Form, message } from 'antd';
import Breadcrumb from '@/components/breadcrumb';
import { useRef, useState, useEffect } from 'react';
import Button from '@/components/button';
import { useNavigate, useParams } from 'react-router-dom';
import { createCampaign } from '@/api/incentive';
import { useQueryClient } from 'react-query';
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
import useCredential from '@/hooks/queries/useCredential';
import useCampaign from '@/hooks/queries/useCampaign';
import Loading from '@/components/loading';

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
const defaultStep = '1';

const checkFormValidte = conf => {
  return (
    conf &&
    conf?.every(v => {
      return v?.credential?.length > 0 && v?.reward?.length > 0;
    })
  );
};

export default function () {
  const [messageApi, contextHolder] = message.useMessage();
  const [step, setStep] = useState(defaultStep);
  const [confirmCreateLoading, setConfirmCreateLoading] = useState(false);
  const { projectId, project } = useUserInfo();
  const [sucessData, setSucessData] = useState(false);
  const queryClient = useQueryClient();
  const { data: NFTcontracts = [] } = useNFTcontract();
  const { data: credentialList = [] } = useCredential();
  const [credentialReward, setCredentialReward] = useState([
    { ...defaultCredentialReward },
  ]);
  const [setupSubmittable, setSetUpSubmittable] = useState(false);
  const [setUpForm] = Form.useForm();
  const { id: campaignId } = useParams();
  const fd = useRef({});
  const navigate = useNavigate();
  const editMode = !!campaignId;
  const { data: pageInfo = {}, isLoading: isCampaignLoading } =
    useCampaign(campaignId);
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
      const remoteCredentialReward = pageInfo.groups.map(v => {
        const reward = [];
        if (Array.isArray(v.pointList) && v.pointList.length > 0) {
          console.log(v.pointList.map(p => ({ ...p, rewardType: 2 })));
          reward.push(...v.pointList.map(p => ({ ...p, rewardType: 2 })));
        }
        if (Array.isArray(v.nftList) && v.nftList.length > 0) {
          reward.push(...v.nftList.map(p => ({ ...p, rewardType: 1 })));
        }
        console.log({ reward });
        return {
          credential: v.credentialList,
          reward,
        };
      });
      console.log({ remoteCredentialReward });
      setCredentialReward(remoteCredentialReward);
    }
    console.log({ credentialReward, pageInfo });
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
    const data = {
      campaign: fd.current,
      groups: credentialReward.map(v => {
        const credentialList = v.credential;
        const pointList = v.reward
          .filter(v => v.rewardType === 2)
          .map(v => ({ ...v, unlimited: !v.unlimited }));
        const nftList = v.reward
          .filter(v => v.rewardType === 1)
          .map(v => ({ ...v, picUrl: v.picUrl?.[0]?.response }))
          .map(v => {
            const nft = NFTcontracts.find(n => n.nftId === v.nftId);
            return {
              ...v,
              chainId: nft.chainId,
              contract: nft.contract,
              creatorId: nft.creatorId,
              unlimited: !v.unlimited,
            };
          });
        return {
          status: 1,
          projectId,
          credentialList,
          pointList,
          nftList,
          groupType: credentialList[0]?.groupType,
          name: credentialList[0]?.name,
        };
      }),
    };
    return;
    // console.log(credentialReward, data)
    try {
      const res = await createCampaign(data);
      setConfirmCreateLoading(false);
      // navigate(listLink)
      setSucessData(res);
      queryClient.refetchQueries(['campaignList', projectId]);
    } catch (error) {
      setConfirmCreateLoading(false);
      messageApi.error(error?.msg || defaultErrorMsg);
      console.log(error);
    }
  };

  const setUpFormValues = Form.useWatch([], setUpForm);
  useEffect(() => {
    setUpForm.validateFields({ validateOnly: true }).then(
      () => {
        setSetUpSubmittable(true);
      },
      () => {
        setSetUpSubmittable(false);
      }
    );
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
    <div className='text-white relative min-h-full'>
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

      <div className='pt-1 mb-40'>
        <h1 className='text-4xl  mb-10 font-bold'>{title}</h1>
        <div className='relative'>
          {step === '1' && <BasicInfo form={setUpForm} />}
          {step === '2' && (
            <CredentialReward
              credentialReward={credentialReward}
              setCredentialReward={setCredentialReward}
              NFTcontracts={NFTcontracts}
              credentialList={credentialList}
            />
          )}
        </div>
      </div>

      <div className='fixed bottom-0 inset-x-0 pl-[280px]'>
        <div className='flex justify-end items-center w-[1080px] h-20 mx-auto relative before:-z-10 before:absolute before:inset-0 before:bg-black/20 before:blur before:backdrop-blur'>
          <div className='flex justify-center space-x-6'>
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
                  type='primary'
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
                  type='primary'
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
        shareLink={`${getUrl()}/${project?.projectUrl}/${get(
          sucessData,
          'campaign.campaignId'
        )}`}
        setOpen={setSucessData}
        jumpLink={`/campaign/${get(sucessData, 'campaign.campaignId')}/detail`}
      />
      {contextHolder}
    </div>
  );
}
