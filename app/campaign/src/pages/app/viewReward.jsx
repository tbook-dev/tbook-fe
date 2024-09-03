import { Popover, message } from 'antd';
import pointIcon from '@/images/icon/point-modal.svg';
import multiplyIcon from '@/images/icon/multiply.svg';
import noticeSvg from '@/images/icon/notice.svg';
import { credentialStatus, incentiveMethodList } from '@/utils/conf';
import TimeDown from './timeDown';
import { CloseOutlined } from '@ant-design/icons';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useResponsive } from 'ahooks';
import {
  claimCampaign,
  getNftClaimInfo,
  updateClaimed,
  getNFTSupportedChains,
} from '@/api/incentive';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAccount, useSwitchNetwork } from 'wagmi';
import {
  getNetwork,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import abi from '@/abi/st';
import WithClaim from './withClaim';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import { formatImpact } from '@tbook/utils/lib/conf';
import Drawer from '@/components/drawer';
import Button from '@/components/button';
import RewardSwiper from './rewardSwiper';
import RewardLabels from './rewardLabels';

export default function ViewReward({ open, onClose, rewardList }) {
  const { pc } = useResponsive();

  const [loading, updateLoading] = useState(false);
  // const itemStatus = credentialStatus.find((v) => v.value === data.claimedType);
  // const incentiveMethodItem = incentiveMethodList.find(
  //   (v) => v.value === data.methodType
  // );
  const [displayIdx, setDisplayIdx] = useState(0);
  const dispath = useDispatch();
  const queryClient = useQueryClient();
  const { campaignId } = useParams();
  const {
    data: page,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
  } = useCampaignQuery(campaignId);
  const { address, isConnected, ...others } = useAccount();
  const { switchNetworkAsync, data: currentChain } = useSwitchNetwork();
  const [supportChains, setSupportChains] = useState([]);
  const { wallectConnected } = useUserInfoQuery();

  useEffect(() => {
    const getData = async () => {
      const contractChains = await getNFTSupportedChains();
      setSupportChains(contractChains);
    };
    getData();
  }, []);

  const handleClaim = async (data) => {
    updateLoading(true);
    try {
      console.log('handleClaimPoint');
      await claimCampaign(data.groupId);
    } catch (error) {
      console.log(error);
    }
    await queryClient.refetchQueries(['campaignDetail', campaignId, true]);
    updateLoading(false);
  };
  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected;
  }, [isConnected, wallectConnected]);

  const connectWallect = useCallback(() => {
    dispath(setConnectWalletModal(true));
  }, []);

  const handleClaimNFT = async (nft) => {
    try {
      updateLoading(true);
      const info = await getNftClaimInfo(nft.nftId, nft.groupId);

      if (getNetwork().chain?.id != nft.chainId) {
        await switchNetworkAsync(nft.chainId);
      }
      if (nft.chainId != getNetwork().chain?.id) {
        message.error('wrong network, please switch in your wallet');
        return;
      }
      const currentInfo = supportChains.find((c) => c.chainId == nft.chainId);

      const config = await prepareWriteContract({
        address: currentInfo.stationContractAddress,
        abi: abi,
        functionName: 'claim',
        args: [
          info.cid,
          info.nftAddress,
          info.dummyId,
          info.powah,
          info.account,
          info.sign,
        ],
      });
      const r = await writeContract(config);

      const data = await waitForTransaction({ hash: r.hash });
      console.log('transaction log: ', data);
      await updateClaimed(
        nft.nftId,
        nft.groupId,
        data.transactionHash,
        info.dummyId
      );
      await queryClient.refetchQueries(['campaignDetail', campaignId]);
      updateLoading(false);
    } catch (error) {
      if (
        error.shortMessage &&
        error.shortMessage.indexOf('Already minted') >= 0
      ) {
        message.error('Claim failed: Already minted');
      } else {
        message.error('Claim failed');
      }
      console.log(error);
      updateLoading(false);
    }
    // await queryClient.refetchQueries(['campaignDetail', campaignId])
  };

  const reward = rewardList[displayIdx];
  return (
    <Drawer open={open} onCancel={onClose} title={null} showClose>
      <div className="bg-[#121212] pt-4 pb-14">
        <div className="w-full flex justify-end">
          <CloseOutlined
            className="text-white cursor-pointer w-6 mr-4"
            onClick={onClose}
          />
        </div>
        <div className="space-y-10 pt-10">
          <h2 className="text-[#CFF469] font-sf-bold text-2xl text-center">
            {reward.type === 'point' && `${formatImpact(reward.number)} Pts`}
            {reward.type === 'nft' && 'NFT'}
            {reward.type === 'sbt' && 'SBT'}

            <span className="ml-1">is eligible!</span>
          </h2>
          <div className="space-y-4">
            <RewardSwiper
              size="large"
              displayIdx={displayIdx}
              setDisplayIdx={setDisplayIdx}
              rewardList={rewardList}
            />
            <div className="text-white">
              <RewardLabels
                reward={reward}
                endAt={page?.campaign?.endAt}
                campaignNotStart={campaignNotStart}
                campaignEnd={campaignEnd}
                campaignOngoing={campaignOngoing}
              />
            </div>
          </div>
          <Button type="purple" className="w-[300px] mx-auto">
            Claim Rewards
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
