import { useMemo } from 'react';
import Address from '@tbook/ui/src/Address';

export default function MergePassportCard ({ account = {}, name }) {
  const accountList = useMemo(() => {
    return [
      {
        name: 'X account',
        value: account.twitterName,
        show: !!account.twitterName,
      },
      {
        name: 'Discord account',
        value: account.dcName,
        show: !!account.dcName,
      },
      {
        name: 'Telegram account',
        value: account.tgName,
        show: !!account.tgName,
      },
      {
        name: 'EVM address',
        value: <Address address={account.evmAddress} />,
        show: !!account.evmAddress,
      },
      {
        name: 'Ton address',
        value: <Address address={account.tonAddress} />,
        show: !!account.tonAddress,
      },
    ].filter(c => c.show);
  }, [account]);

  return (
    <div className='py-6 space-y-4 text-sm'>
      <h3 className='text-white'>{name}</h3>
      {accountList.map(v => {
        return (
          <div key={v.name} className='flex items-center justify-between'>
            <span className=''>{v.name}</span>
            <span className='text-white font-medium'>{v.value}</span>
          </div>
        );
      })}
    </div>
  );
}
