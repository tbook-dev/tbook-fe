import { Modal } from 'antd';
import { useResponsive } from 'ahooks';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { setSnapshotCastModal, setSnapshotData } from '@/store/global';
import {
  useVp,
  useProposal,
  useUserVotes,
  castVote,
} from '@tbook/snapshot/api';
import { useDispatch } from 'react-redux';
import { formatDollarV2 } from '@tbook/utils/lib/conf';
import Arrow2Icon from '@/images/icon/arrow2.svg';
import errorIcon from '@/images/icon/error.svg';
import { useWalletClient } from 'wagmi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import snapshotSVG from '@/images/icon/snapshot.svg';
import { useTelegram } from '@/hooks/useTg';
import useUserInfo from '@/hooks/useUserInfoQuery';

// import { verifyTbook } from '@/api/incentive'
const snapshotPrompt = `powered by snapshot`;

const moduleConf = {
  title: 'Cast your vote',
  desc: [
    'Please check your voting information.',
    'In the meantime, please be patient while we check your voting power.',
  ],
  ethscan: 'https://etherscan.io/block',
  noVotingPower: v =>
    `You can't vote for this proposal. It seems you don't have any voting power at block ${formatDollarV2(
      v
    )}.`,
  votingPowerLink: 'https://github.com/snapshot-labs/snapshot/discussions/767',
  votingPowerText: 'Learn more',
  button: 'Confirm',
  voteSucess: 'Vote sucess!',
  voteError: 'Vote error!',
};
export default function CastModal () {
  const { isTMA } = useTelegram();
  const { pc } = useResponsive();
  const dispath = useDispatch();
  const { snapshotId } = useParams();
  const { evmAddress: address } = useUserInfo();
  // const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { showSnapshotCastModal, snapshotData } = useSelector(s => s.global);
  const { data, refetch } = useProposal(snapshotId);
  const { refetch: refetchVote } = useUserVotes(snapshotId, address);
  const [voting, setVoting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const op = {
    address,
    network: data?.network,
    strategies: data?.strategies,
    snapshot: data?.snapshot,
    space: data?.space?.id,
  };
  const { data: vp } = useVp(op);
  const hasPower = BigNumber(vp?.vp).gt(0);

  const handleCancel = () => {
    dispath(setSnapshotCastModal(false));
    dispath(setSnapshotData(null));
  };
  const handleVote = () => {
    setVoting(true);
    const param = {
      proposal: data?.id,
      space: data?.space?.id,
      type: data?.type,
      choice: snapshotData?.choice,
      app: data?.app,
    };
    castVote(walletClient, address, param)
      .then(r => {
        messageApi.success(moduleConf.voteSucess);
        // 上报
        // verifyTbook(credentialId)
        refetch();
        refetchVote();
      })
      .catch(e => {
        console.error(e);
        messageApi.error(moduleConf.voteError);
      })
      .finally(() => {
        setVoting(false);
        handleCancel();
      });
  };

  return (
    <Modal
      title={null}
      footer={null}
      centered
      open={showSnapshotCastModal}
      closable={pc ? true : false}
      onCancel={handleCancel}
    >
      <div className='-mx-6'>
        <div className='mx-6 mb-2'>
          <h2 className='text-base font-medium'>{moduleConf.title}</h2>

          {moduleConf.desc.map((v, idx) => {
            return (
              <p key={idx} className='text-xs text-[#C0ABD9]'>
                {v}
              </p>
            );
          })}
        </div>

        <div className='my-3 h-px bg-[#8148C6]' />

        <div className='mx-6 space-y-3 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-[#C0ABD9]'>Choice</span>
            <span className='font-medium'>{snapshotData?.choiceText}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[#C0ABD9]'>Snapshot</span>
            <a
              href={`${moduleConf.ethscan}/${data?.snapshot}`}
              target={isTMA ? '_self' : '_blank'}
              className='font-medium flex items-center hover:text-[#C0ABD9]'
            >
              {formatDollarV2(data?.snapshot)}
              <img src={Arrow2Icon} alt='block link' />
            </a>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-[#C0ABD9]'>Your voting power</span>
            {hasPower ? (
              <span className='font-medium'>
                {formatDollarV2(BigNumber(vp?.vp).toFixed(6), 6)} {data?.symbol}
              </span>
            ) : (
              <span className='font-medium flex items-center gap-x-1'>
                <img
                  src={errorIcon}
                  className='w-4 h-4'
                  alt='no voting power'
                />
                0 {data?.symbol}
              </span>
            )}
          </div>
          {hasPower ? (
            <button
              disabled={voting}
              onClick={handleVote}
              className='h-8 w-full rounded-lg bg-white text-black text-sm font-medium flex items-center justify-center gap-x-2'
            >
              {moduleConf.button}
              {voting && (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
                />
              )}
            </button>
          ) : (
            <div className='flex items-start gap-x-2'>
              <img
                src={errorIcon}
                alt='no voting power'
                className='w-4 h-4 mt-1'
              />
              <div className='text-xs'>
                <p className='text-[#C0ABD9]'>
                  {moduleConf.noVotingPower(data?.snapshot)}
                </p>
                <a
                  rel='nofollow noopener noreferrer'
                  target={isTMA ? '_self' : '_blank'}
                  href={moduleConf.votingPowerLink}
                  className='text-[#78589e] hover:text-white underline hover:underline'
                >
                  {moduleConf.votingPowerText}
                </a>
              </div>
            </div>
          )}
          <div className='flex items-center  justify-center gap-x-2'>
            <img src={snapshotSVG} alt='snapshot logo' />
            <p className='text-xs text-[#78589e]'>{snapshotPrompt}</p>
          </div>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}
