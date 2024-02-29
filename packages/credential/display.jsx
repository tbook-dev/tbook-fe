import credentialList from './credential';

/**
 * labelType: number, credential的类型
 * clickHandle: function, 点击处理函数
 * pc: boolean, 是否是pc端
 * option: object, credential 配置解析结果展示
 */
export default function CredentialDisplay({
  labelType,
  clickHandle,
  pc,
  options = {},
}) {
  const credentialConf = credentialList.find((v) => v.labelType === labelType);
  const displayMap = {
    11: ({ userName, link, intentLink }) => {
      return (
        <a
          href={pc ? intentLink : link}
          className="text-[#904BF6] text-base inline-flex"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Follow <span className="text-white ml-1">@{userName}</span>
        </a>
      );
    },
  };

  const CC = displayMap[labelType];
  return (
    <div
      onClick={typeof clickHandle === 'function' ? clickHandle : null}
      className="flex items-start gap-x-1 pt-[3px] flex-auto w-[calc(100%_-_45px)]"
    >
      <img
        src={credentialConf.picUrl}
        className="w-5 h-5 object-contain mt-0.5"
      />
      <div className="text-sm max-w-[calc(100%_-_26px)] lg:max-w-[430px]">
        <CC {...options} />
      </div>
    </div>
  );
}
