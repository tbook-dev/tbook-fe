import { moduleConf } from './conf';
import { Link, useNavigate } from 'react-router-dom';
import bgPNG from './images/bg-apply.png';
import VerifyOTP from './components/verifyOTP';
import { useState } from 'react';
import { projectVerify } from '@/api/incentive';
import { Spin, message } from 'antd';
import useUserInfo from '@/hooks/queries/useUserInfo';

const errorTip = 'Unknown error, please try again later.';
const aboardPath = '/aboard';

export default function Verify () {
  const { refetch } = useUserInfo();
  const [messageApi, contextHolder] = message.useMessage();
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleCodeChange = v => {
    setCode(v);
  };
  const handleSumbit = async () => {
    setLoading(true);
    try {
      const res = projectVerify({ payload: code });
      if (res.sucess) {
        await refetch();
        navigate(aboardPath);
      } else {
        messageApi.error(res.message || errorTip);
      }
    } catch (error) {
      messageApi.error(error.message || errorTip);
    }

    setLoading(false);
    // projectVerify;
  };
  return (
    <div
      style={{ backgroundImage: `url(${bgPNG})` }}
      className='flex-auto bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'
    >
      {contextHolder}
      <div className='w-[1280px] mx-auto'>
        <div className='grid grid-cols-2 gap-2.5'>
          <div className='text-[68px] font-medium text-[rgb(225,205,255)]/90 flex items-center justify-center'>
            {moduleConf.left.title}
          </div>
          <Spin spinning={loading}>
            <div className='items-center my-6  h-[740px] p-20 rounded-[32px] bg-black/20 drop-shadow border border-white/20 flex flex-col justify-between gap-y-[80px]'>
              <div>
                <h2 className='text-4xl w-[460px] mb-10 text-center'>
                  {moduleConf.right.title[0]}
                  <br />
                  <span className='ms-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#7E6CA5] to-80%'>
                    {moduleConf.right.title[1]}
                  </span>
                </h2>
                <div className='flex items-center justify-center mb-4'>
                  {moduleConf.right.iconList.map((v, i) => (
                    <img
                      src={v}
                      key={v}
                      alt='project logo'
                      className='size-14 -ml-2 rounded-full  ring-2 ring-[#1E1032] relative'
                      style={{ zIndex: i }}
                    />
                  ))}
                </div>
                <p className='text-sm text-[rgb(225,205,255)]/70 text-center'>
                  {moduleConf.right.desc}
                </p>
              </div>
              <div className='space-y-4 px-[50px] w-full'>
                <VerifyOTP value={code} onChange={handleCodeChange} />
                <button
                  onClick={handleSumbit}
                  disabled={code?.length !== 6}
                  className='bg-[#904BF6] font-zen-dot text-white rounded-lg text-base block py-2 w-full disabled:opacity-40'
                >
                  {moduleConf.right.verifyBtn}
                </button>
                <p className='text-[rgb(225,205,255)]/70 text-sm text-center'>
                  {moduleConf.right.apply[0]}
                  <Link className='text-[#904BF6]' to='/waitlist/apply'>
                    {moduleConf.right.apply[1]}
                  </Link>
                </p>
              </div>
              <div className='flex items-center divide-x'>
                {moduleConf.right.accounts.map(v => {
                  return (
                    <div
                      className='flex items-center gap-x-3 px-8'
                      key={v.type}
                    >
                      <img className='size-10' src={v.logo} alt='social logo' />
                      <div className='space-y-0.5 text-[rgb(255,255,255)]/60'>
                        <p>{v.name}</p>
                        <p>@{v.socialName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
}
