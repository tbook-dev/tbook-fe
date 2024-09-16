import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { useEventListener } from 'ahooks';
import './rich.css';

export default function Markdown({ value, className, theme }) {
  const [showMore, setShowMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    calcFn();
  }, [value]);

  const calcFn = () => {
    if (textRef.current && !showMore) {
      const { offsetHeight, scrollHeight } = textRef.current;
      if (scrollHeight > offsetHeight) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  };

  useEventListener('resize', calcFn);

  return (
    <div
      className={clsx(hasMore ? 'mb-[104px]' : 'mb-0', ' relative', className)}
    >
      <div
        className={clsx(
          'relative mce-content-body',
          showMore ? '' : 'max-h-[180px] overflow-hidden',
          hasMore &&
            !showMore &&
            'after:absolute after:inset-0',
          theme === 'light' ? 'after:bg-linear17' : 'after:bg-linear4'
        )}
        ref={textRef}
        onLoad={calcFn}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      {hasMore && (
        <button
          onClick={() => setShowMore((v) => !v)}
          className={clsx(
            showMore ? 'mt-2' : '-mt-5',
            'font-medium px-5 py-2 border rounded-full text-sm absolute left-1/2 -translate-x-1/2 border-[#333] ',
            theme === 'light' ? 'bg-white text-black' : 'bg-black text-white ' 
          )}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}
