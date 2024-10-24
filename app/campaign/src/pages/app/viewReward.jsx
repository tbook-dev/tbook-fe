import { message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import { useState, useMemo, useCallback } from 'react';
import {
  claimCampaign,
  getNftClaimInfo,
  updateClaimed,
  claimSBT,
} from '@/api/incentive';
import { useQueryClient } from 'react-query';
// import { useParams } from 'react-router-dom';
import { useAccount, useSwitchNetwork } from 'wagmi';
import {
  getNetwork,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import abi from '@/abi/st';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import Drawer from '@/components/drawer';
import Button from '@/components/button';
import RewardSwiper from './rewardSwiper';
import RewardLabels from './rewardLabels';
import useSupportedChains from '@/hooks/useSupportedChains';
import WebApp from '@twa-dev/sdk';
import TonSocietyIcon from '@/images/icon/svgr/ton-society.svg?react';
import {
  credentialStatus,
  sbtClaimStatus,
  getRewardStatus,
} from '@/utils/conf';
import useWallet from '@/hooks/useWallet';

export default function ViewReward({ open, onClose, campaignId, rewardList }) {
  const [loading, updateLoading] = useState(false);
  const [messageAPI, messageContext] = message.useMessage();
  const { data: supportChains = [] } = useSupportedChains({
    enabled: rewardList.some((v) => v.type === 'nft'),
  });
  const [displayIdx, setDisplayIdx] = useState(0);
  const dispath = useDispatch();
  const queryClient = useQueryClient();
  // const { campaignId } = useParams();
  const {
    data: page,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
  } = useCampaignQuery(campaignId);
  const { address, isConnected, ...others } = useAccount();
  const { switchNetworkAsync, data: currentChain } = useSwitchNetwork();
  const { wallectConnected } = useUserInfoQuery();
  const { getWallets } = useWallet();
  const [ton] = getWallets('ton');

  const reward = rewardList[displayIdx];
  // reward.claimedType = 1;
  const currentStatus = credentialStatus.find(
    (v) => v.value === reward.claimedType
  );
  const rewardStatus = Object.assign(
    {},
    currentStatus,
    reward.type === 'sbt'
      ? sbtClaimStatus.find((v) => v.value === reward.claimedType) ?? {}
      : {}
  );
  const handleClaimPoint = async (data) => {
    updateLoading(true);
    try {
      console.log('handleClaimPoint');
      await claimCampaign(data.groupId);
      await queryClient.refetchQueries(['campaignDetail', campaignId, true]);
    } catch (error) {
      console.log(error);
    }
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
      if (!canUseWallect) {
        onClose();
        connectWallect();
        return;
      }
      updateLoading(true);
      const info = await getNftClaimInfo(nft.nftId, nft.groupId);

      if (getNetwork().chain?.id != nft.chainId) {
        await switchNetworkAsync(nft.chainId);
      }
      if (nft.chainId != getNetwork().chain?.id) {
        messageAPI.error('wrong network, please switch in your wallet');
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
        messageAPI.error('Claim failed: Already minted');
      } else {
        messageAPI.error('Claim failed');
      }
      console.log(error);
      updateLoading(false);
    }
    // await queryClient.refetchQueries(['campaignDetail', campaignId])
  };
  const handleClaimSbt = async (reward) => {
    if (!ton.connected) {
      onClose();
      ton.connectHandle();
      return;
    }
    updateLoading(true);
    try {
      const res = await claimSBT(reward.sbtId);
      if (res?.link) {
        WebApp.openLink(res?.link, { try_instant_view: true });
        await queryClient.refetchQueries(['campaignDetail', campaignId, true]);
      } else {
        messageAPI.error(res?.message ?? 'mint unkonwn error!');
      }
    } catch (error) {
      console.log(error);
      messageAPI.error(error.message ?? 'mint unkonwn error!');
    }
    updateLoading(false);
  };
  const handleClaimRewards = () => {
    if (reward.type === 'point') {
      handleClaimPoint(reward);
    } else if (reward.type === 'nft') {
      handleClaimNFT(reward);
    } else if (reward.type === 'sbt') {
      handleClaimSbt(reward);
    }
  };
  const { title } = getRewardStatus(reward);
  // const title = useMemo(() => {
  //   if (!reward) return;
  //   let name = '';
  //   if (reward.type === 'point') {
  //     name = `${formatImpact(reward.number)} Pts`;
  //   } else if (reward.type === 'nft') {
  //     name = reward.name ?? 'NFT';
  //   } else if (reward.type === 'sbt') {
  //     name = reward.name ?? 'SBT';
  //   }
  //   return rewardStatus?.title(name);
  // }, [reward]);
  const buttonText = useMemo(() => {
    if (!reward) return;
    if (loading) return "let's see……";
    if (reward.type === 'point') {
      return 'Claim Points';
    } else if (reward.type === 'nft') {
      return 'Claim NFT';
    } else if (reward.type === 'sbt') {
      return (
        <>
          Mint SBT on <TonSocietyIcon />
        </>
      );
    }
  }, [reward, loading]);

  return (
    <Drawer open={open} onCancel={onClose} title={null} showClose>
      <div className="bg-[#121212] pt-4 pb-14 px-4">
        <div className="flex justify-end w-full">
          <CloseOutlined
            className="w-6 mr-4 text-white cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="pt-10 space-y-10">
          <h2 className="text-[#CFF469] font-bold text-2xl text-center px-4">
            {title}
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
          <div className="space-y-1">
            {rewardStatus?.showButton && (
              <>
                <Button
                  type="purple"
                  className="w-[300px] flex items-center justify-center gap-x-1 mx-auto hover:opacity-100 notbtn-click"
                  onClick={handleClaimRewards}
                  loading={loading}
                >
                  {buttonText}
                </Button>
                {reward.type === 'sbt' && (
                  <div className="text-xs text-white/60 w-[300px] mx-auto">
                    The minting process takes place on Ton Society. It usually
                    takes 1-3 days. For minting updates and results, please
                    check on Ton Society.
                  </div>
                )}
              </>
            )}
            {rewardStatus?.tip && (
              <div className="text-sm text-white text-center font-medium w-[300px] mx-auto">
                {rewardStatus?.tip?.split('\n').map((v, i) => (
                  <p key={i}>{v}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {messageContext}
    </Drawer>
  );
}
