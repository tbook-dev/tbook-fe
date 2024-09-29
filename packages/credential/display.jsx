import credentialList from './credential';
import actionMap from './action';

/**
 * labelType: number, credential的类型
 * clickHandle: function, 点击处理函数
 * pc: boolean, 是否是pc端
 * options: object, credential 配置解析结果展示
 */
export default function CredentialDisplay({
  labelType,
  clickHandle,
  pc,
  options = {},
  theme = 'dark',
  canVerify = true,
}) {
  const credentialConf = credentialList.find((v) => v.labelType === labelType);
  const { isLink, link, actionName, actionTarget, actionHandle } = {
    isLink: actionMap[labelType]?.isLink,
    link: actionMap[labelType]?.getLink({ ...options, pc }),
    actionName: actionMap[labelType]?.getActionName(options),
    actionTarget: actionMap[labelType]?.getActionTarget(options),
    actionHandle: typeof clickHandle === 'function' ? clickHandle : null,
  };
  const wrapclx = `flex items-start flex-nowrap break-words gap-x-1 pt-[3px] flex-auto text-base ${
    canVerify ? '' : theme==='dark' ? 'opacity-40' : 'opacity-60'
  }`;
  //   console.log({
  //     isLink,
  //     link,
  //     actionName,
  //     actionTarget,
  //     actionHandle,
  //     options,
  //   });
  return isLink ? (
    <a
      href={link}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={actionHandle}
      className={wrapclx}
    >
      <img
        src={theme === 'dark' ? credentialConf.picUrl : credentialConf.picUrl2}
        className="w-5 h-5 object-contain mt-0.5 flex-none"
        alt="credential logo"
      />
      <span className="flex-auto line-clamp-3">
        <span className="text-[#CFF469]">{actionName}</span>
        <span className="ml-1">{actionTarget}</span>
      </span>
    </a>
  ) : (
    <button onClick={actionHandle} className={wrapclx}>
      <img
        src={theme === 'dark' ? credentialConf.picUrl : credentialConf.picUrl2}
        className="w-5 h-5 object-contain mt-0.5 flex-none"
        alt="credential logo"
      />
      <span className="flex-auto line-clamp-3 text-start">
        <span className="text-[#CFF469]">{actionName}</span>
        <span className="ml-1">{actionTarget}</span>
      </span>
    </button>
  );
}
