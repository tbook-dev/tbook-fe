import Friends from './components/friends';
import Board from './components/board';
import Scratch from './components/scratch';
import { useState } from 'react';
import RuleModal from './components/modal/rule';

import './index.css';

export default function Renaissance() {
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  return (
    <div className="px-5 pt-3 lg:px-0 mx-auto space-y-3 pb-10">
      <button
        onClick={() => {
          setIsRuleModalOpen(true);
        }}
        className="fixed font-syne  underline underline-offset-2 flex items-center gap-x-1 leading-[12px] text-xs z-10 right-0 top-40 bg-[#FFEAB5] text-[#563BFF] py-1.5 pl-1.5 pr-3 border border-r-0 rounded-l-2.5xl border-[#FBD6A0] text-[#FBD6A0]/60"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4 5.4H5.37647C5.16855 5.4 5 5.57909 5 5.8V6.6C5 6.82092 5.16855 7 5.37647 7H11.4C11.6079 7 11.7765 6.82092 11.7765 6.6V5.8C11.7765 5.57909 11.6079 5.4 11.4 5.4Z"
            fill="#563BFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.10588 2C7.89797 2 7.72941 2.17909 7.72941 2.4V14H7.73192C7.80623 16.2225 9.52539 18 11.6353 18C11.7143 18 11.7928 17.9975 11.8706 17.9926V16.6996C10.458 16.6738 9.31156 15.4878 9.23895 14H9.23529V2.4C9.23529 2.17909 9.06674 2 8.85882 2H8.10588Z"
            fill="#563BFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.9743 10.9C12.7383 10.9 12.5097 10.8652 12.2929 10.8H12.9743V9.5966C13.6581 9.54716 14.1979 8.96315 14.1979 8.24999C14.1979 7.53683 13.6581 6.95282 12.9743 6.90338V5.39999C14.3778 5.39999 15.5155 6.63121 15.5155 8.14999C15.5155 9.66877 14.3778 10.9 12.9743 10.9ZM12.692 5.39999C12.4841 5.39999 12.3155 5.57908 12.3155 5.79999V6.49999C12.3155 6.7209 12.4841 6.89999 12.692 6.89999H12.9743V5.39999H12.692Z"
            fill="#563BFF"
          />
          <path
            d="M10.4332 10C10.4332 9.7791 10.6017 9.60001 10.8096 9.60001H13.2567V11.2H10.8096C10.6017 11.2 10.4332 11.0209 10.4332 10.8V10Z"
            fill="#563BFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2567 18C15.3879 18 17.1155 16.1868 17.1155 13.95C17.1155 11.7132 15.3879 9.89999 13.2567 9.89999V11.2004C14.6644 11.2271 15.7979 12.4479 15.7979 13.95C15.7979 15.4521 14.6644 16.6729 13.2567 16.6996V18Z"
            fill="#563BFF"
          />
          <path
            d="M12.8802 17.1C12.8802 16.8791 13.0488 16.7 13.2567 16.7L13.2567 18C13.0488 18 12.8802 17.8209 12.8802 17.6V17.1Z"
            fill="#563BFF"
          />
          <path
            d="M11.7765 16.7H11.9647C12.1726 16.7 12.3412 16.8791 12.3412 17.1V17.6C12.3412 17.8209 12.1726 18 11.9647 18H11.7765V16.7Z"
            fill="#563BFF"
          />
        </svg>
        We Scratch !
      </button>
      <Board />
      <Scratch />
      <Friends />
      <RuleModal
        open={isRuleModalOpen}
        onCancel={() => {
          setIsRuleModalOpen(false);
        }}
      />
    </div>
  );
}
