import credentialList from './credential';
import actionMap from './action';

/**
 * labelType: number, credential的类型
 * clickHandle: function, 点击处理函数
 * pc: boolean, 是否是pc端
 * options: object, credential 配置解析结果展示
 */
export default function CredentialDisplay ({
  labelType,
  clickHandle,
  pc,
  options = {},
}) {
  const credentialConf = credentialList.find(v => v.labelType === labelType);

  const { isLink, link, actionName, actionTarget, actionHandle } = {
    isLink: actionMap[labelType]?.isLink,
    link: actionMap[labelType]?.getLink({ ...options, pc }),
    actionName: actionMap[labelType]?.getActionName(options),
    actionTarget: actionMap[labelType]?.getActionTarget(options),
    actionHandle: typeof clickHandle === 'function' ? clickHandle : null,
  };
  //   console.log({
  //     isLink,
  //     link,
  //     actionName,
  //     actionTarget,
  //     actionHandle,
  //     options,
  //   });

  return (
    <div
      onClick={actionHandle}
      className='flex items-start gap-x-1 pt-[3px] flex-auto w-[calc(100%_-_45px)]'
    >
      <img
        src={credentialConf.picUrl}
        className='w-5 h-5 object-contain mt-0.5'
      />
      {isLink ? (
        <a
          href={link}
          target='_blank'
          rel='nofollow noopener noreferrer'
          className='max-w-[calc(100%_-_26px)] lg:max-w-[430px] text-[#904BF6] text-base inline-flex'
        >
          {actionName} <span className='text-white ml-1'>{actionTarget}</span>
        </a>
      ) : (
        <button className='max-w-[calc(100%_-_26px)] lg:max-w-[430px] text-[#904BF6] text-base inline-flex'>
          {actionName} <span className='text-white ml-1'>{actionTarget}</span>
        </button>
      )}
    </div>
  );
}
