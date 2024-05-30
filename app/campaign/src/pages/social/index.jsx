import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RedirectSocial from '@/components/redirectSocial';
import { redirectLocalStorageOnce } from '@/pages/social/conf';
import { delay } from '@/utils/common';
import {
  setShowMergeAccountModal,
  setMergeAccountData,
  setUnbindAccountModal,
  setUnbindAccountData,
} from '@/store/global';
import { useDispatch } from 'react-redux';

const displayName = {
  twitter: 'X',
  discord: 'Discord',
  telegram: 'Telegram',
  google: 'Google',
};
const emailTypeList = ['google'];
const isEmailType = type => emailTypeList.includes(type);

export default function ({ authCallback, type }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState({});
  const dispath = useDispatch();

  const openMergeAccountModal = useCallback(() => {
    dispath(setShowMergeAccountModal(true));
  }, []);
  const openUnbindAccountModal = useCallback(() => {
    dispath(setUnbindAccountModal(true));
  }, []);
  useEffect(() => {
    authCallback()
      .then(async data => {
        setData(data);
        // console.log(data, 'data');
        if (data.code === 4004) {
          setStatus('occupied');
          setErrorMessage('Account  occupied');
          dispath(
            setUnbindAccountData({
              passportA: data.passportA,
              passportB: data.passportB,
            })
          );
          openUnbindAccountModal();
        } else if (data.code === 400) {
          // 检查到可以merge
          setStatus('occupied-merge');
          setErrorMessage(
            `This incentive passport been associated with another incentive passport.
            Do you want to merge the incentive passport with your current incentive passport ?`
          );
          dispath(
            setMergeAccountData({
              passportA: data.passportA,
              passportB: data.passportB,
              redirect: true,
            })
          );
          // openMergeAccountModal();
          // console.log('merge account');
          // openMergeAccountModal()
        } else if (data.code === 500) {
          // 失败
          setStatus('failed');
          setErrorMessage(data.msg);
        } else {
          // 成功停留2s，然后跳转
          setStatus('sucess');
          setErrorMessage(
            `${displayName[type]} account ${isEmailType(type) ? '' : '@'}${
              data.socialName
            } has been authorized. `
          );
          await delay(2000);
          redirectLocalStorageOnce(navigate);
        }
      })
      .catch(async e => {
        console.log(e, 'error');
        setStatus('failed');
      });
  }, []);

  return (
    <div className='w-page-content px-2 lg:px-0 mx-auto'>
      <RedirectSocial
        status={status}
        desc={errorMessage}
        data={data}
        type={type}
      />
    </div>
  );
}
