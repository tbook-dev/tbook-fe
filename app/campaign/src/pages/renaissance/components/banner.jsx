import moduleConf from '../conf';
import { useState } from 'react';
import RuleModal from './modal/rule';

export default function Banner () {
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  return (
    <>
      <div className='flex justify-center relative'>
        {moduleConf.svg.renaissanceText}

        <button
          onClick={() => {
            setIsRuleModalOpen(true);
          }}
          className='absolute -right-5 bottom-[34px] button py-1.5 px-3 text-sm rounded-l-lg border border-r-0 lg:border-r lg:rounded-r-lg border-[#FFDFA2]/60  text-[#f8c685]/60'
        >
          Rules
        </button>
      </div>

      <RuleModal
        open={isRuleModalOpen}
        onCancel={() => {
          setIsRuleModalOpen(false);
        }}
      />
    </>
  );
}
