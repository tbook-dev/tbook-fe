import { cn } from '@/utils/conf';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useCardInit } from './hooks';
import { useEffect } from 'react';

const defaultProps = {
  width: 240,
  height: 120,
  coverColor: '#ddd',
};

const ScratchCard = forwardRef((p, ref) => {
  const props = { ...defaultProps, ...p };
  const { children, classNames, autoReinit, onFinish, ...rest } = props;

  const canvasRef = useRef();
  const [, isFinished, initDone, clearCard, reInitCard] = useCardInit({
    canvasRef,
    ...rest,
  });

  useImperativeHandle(ref, () => ({
    canvasContainer: canvasRef.current,
    initDone,
    clearCard,
  }));

  useEffect(() => {
    if (isFinished) {
      onFinish();
      setTimeout(() => {
        if (autoReinit > 0) {
          reInitCard();
        }
      }, 1000);
    }
  }, [isFinished]);

  return (
    <div
      className={cn('relative', classNames?.root)}
      style={{ width: props.width, height: props.height }}
    >
      <canvas
        ref={canvasRef}
        className={cn('absolute inset-0 z-10', classNames?.mask)}
      ></canvas>
      <div
        className={cn('absolute inset-0 z-[9]', classNames?.body)}
        style={{ width: props.width, height: props.height }}
      >
        {initDone && children}
      </div>
    </div>
  );
});

export default ScratchCard;
